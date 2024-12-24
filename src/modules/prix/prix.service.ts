import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prix } from './entities/prix.entity';
import { validate } from 'class-validator';
import { ValidationException } from 'common/exceptions/validation.exception';
import { LignesPrix } from './entities/lignes-prix.entity';
import { InsertPrixDto } from './dto/create-prix.dto';
import { UpdatePrixDto } from './dto/update-prix.dto';
import { ValiderDonneesPrixCommand } from './dto/valider-donnees-prix.command';

@Injectable()
export class PrixService {
  constructor(
    @InjectRepository(Prix, 'prpacs') // Specify database1
    private prixRepository: Repository<Prix>,
    
    @InjectRepository(LignesPrix, 'prpacs') // Specify database1
    private lignesPrixRepository: Repository<LignesPrix>,
  ) {}

  async createPrix(createPrixDto: InsertPrixDto): Promise<Prix> {
    const { affectationEPE, affectationFiliale, idUtilisateur, affectationGroupe, exercice, trimestre, lignesPrix  } = createPrixDto;
    
    // Check if the entire exercise (all trimesters) is already entered
    const existingTrimestres = await this.prixRepository
      .createQueryBuilder('prix')
      .where('prix.exercice = :exercice', { exercice })
      .andWhere('prix.affectationEPE = :affectationEPE', { affectationEPE })
      .andWhere('prix.affectationFiliale = :affectationFiliale', { affectationFiliale })
      .select('prix.trimestre')
      .getMany();

    // If all 4 trimestres are entered, throw an error
    if (existingTrimestres.length === 4) {
      throw new BadRequestException('L\'exercice est déjà saisi.');
    }

    // Check if the specific trimestre is already entered
    const existingTrimestre = existingTrimestres.find(trimestreDoc => trimestreDoc.trimestre === trimestre);
    if (existingTrimestre) {
      throw new BadRequestException(`Le trimestre ${trimestre} de l'exercice ${exercice} est déjà saisi.`);
    }

    // Create a new Prix entity
    const prix = this.prixRepository.create({
      affectationEPE,
      idUtilisateur,
      affectationFiliale,
      affectationGroupe,
      exercice,
      trimestre,
      estValide: false,
    });
        // Save the prix entity
    await this.prixRepository.save(prix);

    // Create LignesPrix entities and link them to Prix
    const lignesPrixs = lignesPrix.map((ligne) => {
      return this.lignesPrixRepository.create({
        idLigne: ligne.idLigne,                // Optional Guid
        num: ligne.num,
        denomVariete: ligne.denomVariete,
        codeNPA:ligne.codeNPA,
        uniteMesure: ligne.uniteMesure,
        mrQuantite: ligne.mrQuantite,
        mrMontantTTC:ligne.mrMontantTTC,
        mrPuHt: ligne.mrPuHt,
        mrMontantHt: ligne.mrMontantHt,
        deQuantite: ligne.deQuantite,
        deValMDA: ligne.deValMDA,
        deValDevise: ligne.deValDevise,
        trimPrecQte: ligne.trimPrecQte,
        trimPrecPUHT: ligne.trimPrecPUHT,
        trimPrecMontantHT: ligne.trimPrecMontantHT,
        trimPrecMontantTTC:ligne.trimPrecMontantTTC,
        dateEntVigeur: ligne.dateEntVigeur,     // Date type
        obs: ligne.obs,
        prix                   // Foreign key
      });
    });

    // Save all LignesPrix entities
    await this.lignesPrixRepository.save(lignesPrixs);

    return prix;
  }
   // Get all prixs
   async findAll(): Promise<Prix[]> {
    return this.prixRepository.find();
  }


  async updatePrix(id: string, updatePrixDto: UpdatePrixDto): Promise<Prix> {
    const prix = await this.prixRepository.findOne({
      where: { idDoc: id },
      relations: ['lignesPrix'],
    });

    if (!prix) {
      throw new NotFoundException(`Prix with ID ${id} not found`);
    }

    // Update prix fields
    Object.assign(prix, updatePrixDto);

    // Handle lines prix
    const updatedLignesPrix = await Promise.all(
      updatePrixDto.lignesPrix.map(async (ligneDto) => {
        try {
          if (ligneDto.idLigne) {
            // Update existing line
            const ligne = await this.lignesPrixRepository.findOne({
              where: { idLigne: ligneDto.idLigne }});
                          if (!ligne) {
              console.warn(`Ligne with ID ${ligneDto.idLigne} not found for update`);
              return undefined; // Return undefined if not found
            }
            Object.assign(ligne, ligneDto); // Update properties
            return await this.lignesPrixRepository.save(ligne); // Save updated line
          } else {
            // Create new line
            const newLigne = this.lignesPrixRepository.create(ligneDto);
            return await this.lignesPrixRepository.save(newLigne);
          }
        } catch (error) {
          console.error('Error processing line:', ligneDto, error);
          return undefined; // Return undefined on error
        }
      }),
    );

    // Filter out any undefined results
    prix.lignesPrix = updatedLignesPrix.filter(ligne => ligne !== undefined);

    // Save prix
    return this.prixRepository.save(prix);
  }
  // Delete a prix
  async remove(id: string): Promise<void> {
    
    // Find the prix with its related LignesPrix
    const prix = await this.prixRepository.findOne({
      where: { idDoc: id }, // Assuming request has `id`
      relations: ['lignesPrix'],
    });

    if (!prix) {
      throw new NotFoundException(`Prix with ID ${id} not found`);
    }

    // Remove the prix and its related entities
    await this.prixRepository.remove(prix);
  
  }


  public async validatePrixData(request: ValiderDonneesPrixCommand): Promise<void> {
    const errors = await validate(request);
    if (errors.length > 0) {
        throw new ValidationException(errors);
    }

    const prix = await this.prixRepository.findOne({ where: { idDoc: request.id } });

    if (prix) {
        prix.estValide = true;
        await this.prixRepository.save(prix);
    } else {
        throw new NotFoundException(`Prix with ID ${request.id} not found`);
    }
}


async getPrixs(
  page: number,
  pageSize: number,
  idUtilisateur: string,
): Promise<{ data: Prix[]; rowCount: number; currentPage: number; pageSize: number }> {
  // Ensure page and pageSize are valid
  if (page < 1) {
    throw new Error("Page number must be greater than 0");
  }
  if (pageSize < 1) {
    throw new Error("Page size must be greater than 0");
  }

  const [prixs, rowCount] = await this.prixRepository.findAndCount({
    where: { idUtilisateur: idUtilisateur },
    relations: ['lignesPrix'],
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  // Return the paginated result
  return { data: prixs, rowCount, currentPage: page, pageSize: pageSize };
}
}
