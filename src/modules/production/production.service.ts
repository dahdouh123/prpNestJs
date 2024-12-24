import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Production } from './entities/production.entity';
import { LignesProduction } from './entities/lignes-production.entity';
import { InsertProductionDto, LignesProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { ValiderDonneesProductionCommand } from './dto/valider-donnees-production.command';
import { validate } from 'class-validator';
import { ValidationException } from 'common/exceptions/validation.exception';
import { DenominationProduits } from 'modules/denomination/entities/denomination-produits.entity';

@Injectable()
export class ProductionService {
  constructor(
    @InjectRepository(Production, 'prpacs') // Specify database1
    private productionRepository: Repository<Production>,
    
    @InjectRepository(LignesProduction, 'prpacs') // Specify database1
    private lignesProductionRepository: Repository<LignesProduction>,
    @InjectRepository(DenominationProduits, 'prpacsidentity') // Specify database1
    private denominationProduitsRepository: Repository<DenominationProduits>,
  ) {}

  async createProduction(createProductionDto: InsertProductionDto): Promise<Production> {
    const { affectationEPE, affectationFiliale, idUtilisateur, affectationGroupe, exercice, trimestre, lignesProduction, urlecoffe } = createProductionDto;
  
    // Validate the DTO
    const errors = await validate(createProductionDto);
    if (errors.length > 0) {
      throw new ValidationException(errors);
    }
  
    // Check if the entire exercise (all trimesters) is already entered
    const existingTrimestres = await this.productionRepository
      .createQueryBuilder('production')
      .where('production.exercice = :exercice', { exercice })
      .andWhere('production.affectationEPE = :affectationEPE', { affectationEPE })
      .andWhere('production.affectationFiliale = :affectationFiliale', { affectationFiliale })
      .select('production.trimestre')
      .getMany();
  
    if (existingTrimestres.length === 4) {
      throw new BadRequestException('L\'exercice est déjà saisi.');
    }
  
    const existingTrimestre = existingTrimestres.find(trimestreDoc => trimestreDoc.trimestre === trimestre);
    if (existingTrimestre) {
      throw new BadRequestException(`Le trimestre ${trimestre} de l'exercice ${exercice} est déjà saisi.`);
    }
  
    const production = this.productionRepository.create({
      affectationEPE,
      idUtilisateur,
      affectationFiliale,
      affectationGroupe,
      exercice,
      trimestre,
      estValide: false,
      urlecoffe
    });
  
    await this.productionRepository.save(production);
  
    // Process lignesProduction
    const lignesProductions = await Promise.all(lignesProduction.map(async (ligne) => {
      const ligneObject: LignesProductionDto = typeof ligne === 'string' ? JSON.parse(ligne) : ligne;
  
      
      // Call findDenomCof and wait for the result
      const updatedLigneObject = await this.findDenomCof(ligneObject);
      console.log("updated Ligne",updatedLigneObject);
      return this.lignesProductionRepository.create({
        ...updatedLigneObject, // Spread the updated ligne properties
        production, // Associate the line with the production
      });
    }));
    console.log("lignesProd",lignesProductions);
    await this.lignesProductionRepository.save(lignesProductions);
  
    return production;
  }
   // Get all productions
   async findAll(): Promise<Production[]> {
    return this.productionRepository.find();
  }

async findDenomCof(ligneObject: LignesProductionDto): Promise<LignesProductionDto> {
  const denom = await this.denominationProduitsRepository.findOne({
    where: { denomination: ligneObject.denomVariete }
  });

  if (denom) {
    console.log("denom trouve", denom);
    
    ligneObject.ecartStockReelTheoT = ligneObject.ecartStockReelTheo * denom.coeifOfConv || ligneObject.ecartStockReelTheo;
    ligneObject.prodTrimestreQteC2T = ligneObject.prodTrimestreQteC2 * denom.coeifOfConv || ligneObject.prodTrimestreQteC2T;
    ligneObject.stockFinTrimestreReelQteFT = ligneObject.stockFinTrimestreReelQteF * denom.coeifOfConv || ligneObject.stockFinTrimestreReelQteFT;
    ligneObject.stockTrimestrePrecT = ligneObject.stockTrimestrePrec * denom.coeifOfConv || ligneObject.stockTrimestrePrec;
    ligneObject.capProdQteGT = ligneObject.capProdQteG * denom.coeifOfConv || ligneObject.capProdQteG;
    ligneObject.venteTrimestreQteD3T = ligneObject.venteTrimestreQteD3 * denom.coeifOfConv || ligneObject.venteTrimestreQteD3;
    ligneObject.rappelQteProductionTrimestrePrecQtehT = ligneObject.rappelQteProductionTrimestrePrecQteh * denom.coeifOfConv || ligneObject.rappelQteProductionTrimestrePrecQteh;
    ligneObject.stockFinTrimestreTheoT = ligneObject.stockFinTrimestreTheo * denom.coeifOfConv || ligneObject.stockFinTrimestreTheo;

    console.log("line object returned 1", ligneObject);
  } else {
    console.warn("Denomination not found for:", ligneObject.denomVariete);
  }

  console.log("line object returned 2", ligneObject);
  return ligneObject;
}
  async updateProduction(id: number, updateProductionDto: UpdateProductionDto): Promise<Production> {
    const production = await this.productionRepository.findOne({
      where: { idDoc: id },
      relations: ['lignesProduction'],
    });

    if (!production) {
      throw new NotFoundException(`Production with ID ${id} not found`);
    }

    // Update production fields
    Object.assign(production, updateProductionDto);

    // Handle lines production
    const updatedLignesProduction = await Promise.all(
      updateProductionDto.lignesProduction.map(async (ligneDto) => {
        try {
          if (ligneDto.idLigne) {
            // Update existing line
            const ligne = await this.lignesProductionRepository.findOne({
              where: { idLigne: ligneDto.idLigne }});
                          if (!ligne) {
              console.warn(`Ligne with ID ${ligneDto.idLigne} not found for update`);
              return undefined; // Return undefined if not found
            }
            Object.assign(ligne, ligneDto); // Update properties
            return await this.lignesProductionRepository.save(ligne); // Save updated line
          } else {
            // Create new line
            const newLigne = this.lignesProductionRepository.create(ligneDto);
            return await this.lignesProductionRepository.save(newLigne);
          }
        } catch (error) {
          console.error('Error processing line:', ligneDto, error);
          return undefined; // Return undefined on error
        }
      }),
    );

    // Filter out any undefined results
    production.lignesProduction = updatedLignesProduction.filter(ligne => ligne !== undefined);

    // Save production
    return this.productionRepository.save(production);
  }
  // Delete a production
  async remove(id: number): Promise<void> {
    
    // Find the production with its related LignesProduction
    const production = await this.productionRepository.findOne({
      where: { idDoc: id }, // Assuming request has `id`
      relations: ['lignesProduction'],
    });

    if (!production) {
      throw new NotFoundException(`Production with ID ${id} not found`);
    }

    // Remove the production and its related entities
    await this.productionRepository.remove(production);
  
  }


  public async validateProductionData(request: ValiderDonneesProductionCommand): Promise<void> {
    const errors = await validate(request);
    if (errors.length > 0) {
        throw new ValidationException(errors);
    }

    const production = await this.productionRepository.findOne({ where: { idDoc: request.id } });

    if (production) {
        production.estValide = true;
        await this.productionRepository.save(production);
    } else {
        throw new NotFoundException(`Production with ID ${request.id} not found`);
    }
}


  async getProductions(
    page: number,
    pageSize: number,
    idUtilisateur: string,
  ): Promise<{ data: Production[]; rowCount: number , currentPage: number; pageSize: number  }> {
    const [productions, rowCount] = await this.productionRepository.findAndCount({
       where: { idUtilisateur: idUtilisateur },
      relations: ['lignesProduction'],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { data: productions, rowCount , currentPage: page, pageSize: pageSize };
  }
}
