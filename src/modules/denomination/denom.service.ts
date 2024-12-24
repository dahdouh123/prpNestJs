import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DenominationProduitsRepository } from './repo/denomRepo';
import { CreateDenominationProduitsDto } from './dto/CreateDenominationProduitsDto';
import { DenominationProduitsDto } from './dto/DenominationProduitsDto';
import { DenominationProduits } from './entities/denomination-produits.entity';
import { GetDenominationsByAcsHoldingDto } from './dto/get-denominations-by-acs-holding.dto';

@Injectable()
export class DenominationProduitsService {
    constructor(
        @InjectRepository(DenominationProduits,'prpacsidentity')
        private readonly denominationProduitsRepository: DenominationProduitsRepository,
    ) {}

    async create(createDto: CreateDenominationProduitsDto): Promise<DenominationProduitsDto> {
        const { acsHoldingId, denomination, unite, capaciteProd , stockInitial } = createDto;
        
        // Check if a record with the same denomination already exists
        
    
        // Create and save the new denomination if it doesn't exist
        const newDenomination = this.denominationProduitsRepository.create({
            acsHoldingId,
            denomination,
            unite,
            capaciteProd,
            stockInitial
        });
        await this.denominationProduitsRepository.save(newDenomination);
        
        return newDenomination;
    }


    async createMany(createDtos: CreateDenominationProduitsDto[]): Promise<DenominationProduitsDto[]> {
        const createdDenominations: DenominationProduitsDto[] = [];
        console.log("cre",createDtos);

        for (const createDto of createDtos) {
            const existingDenomination = await this.denominationProduitsRepository.findOne({ where: { denomination:createDto.denomination}})
             ;
           if(!existingDenomination){
            const createdDenomination = await this.create(createDto); // Assuming `create` method handles single creation
            createdDenominations.push(createdDenomination);
           }
          
        }

        return createdDenominations;
    }


    async updateMany(updateDtos: CreateDenominationProduitsDto[]): Promise<DenominationProduits[]> {
        const updatedDenominations: DenominationProduits[] = [];
    
        for (const dto of updateDtos) {
          // Use the correct method to find the entity
          const denomination = await this.denominationProduitsRepository.findOne({
            where: { id: dto.id }, // Use the 'where' option
          });
    
          if (!denomination) {
            throw new NotFoundException(`Denomination with ID ${dto.id} not found`);
          }
    
          Object.assign(denomination, dto); // Update fields
          const updatedDenomination = await this.denominationProduitsRepository.save(denomination);
          updatedDenominations.push(updatedDenomination);
        }
    
        return updatedDenominations;
      }


    async findAll(page = 1, limit = 10): Promise<DenominationProduitsDto[]> {
        const skippedItems = (page - 1) * limit;
        const totalCount = await this.denominationProduitsRepository.count();

        const entities = await this.denominationProduitsRepository.find({
            skip: skippedItems,
            take: limit,
        });

        if (!entities) {
            throw new NotFoundException('Entities not found');
        }

        return entities;
    }

    async findOne(id: string): Promise<DenominationProduitsDto> {
      const entity = await this.denominationProduitsRepository.findOneBy({ id });
        
        if (!entity) {
            throw new NotFoundException(`Entity with ID ${id} not found`);
        }

        return entity;
    }

    async update(id: string, updateDto: CreateDenominationProduitsDto): Promise<DenominationProduitsDto> {
        const { acsHoldingId, denomination, unite , coeifOfConv , capaciteProd , stockInitial } = updateDto;
        const entity = await this.denominationProduitsRepository.preload({
            id:id,
            acsHoldingId,
            denomination,
            unite,
            coeifOfConv,
            capaciteProd,
            stockInitial
        });

        if (!entity) {
            throw new NotFoundException(`Entity with ID ${id} not found`);
        }
          console.log("updated denom",entity);
        return await this.denominationProduitsRepository.save(entity);
    }


    async getByAcsHolding(dto: GetDenominationsByAcsHoldingDto) {
      const { acsHoldingId, page, pageSize } = dto;

      const [denominations, total] = await this.denominationProduitsRepository.findAndCount({
          where: { acsHoldingId },  // Filtering by AcsHoldingId
          skip: (page - 1) * pageSize,
          take: pageSize,
      });

      if (denominations.length === 0) {
          throw new NotFoundException(`No denominations found for AcsHoldingId ${acsHoldingId}`);
      }

      return {
          items: denominations,
          totalItems: total,
          currentPage: page,
          totalPages: Math.ceil(total / pageSize),
      };
  }



  async getProductions(
    page: number,
    pageSize: number,
    acsHoldingId: string
  ): Promise<{ data: DenominationProduitsDto[]; rowCount: number; currentPage: number; pageSize: number }> {
    const [productions, rowCount] = await this.denominationProduitsRepository.findAndCount({
      where: { acsHoldingId },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  
    // Return the expected structure with rowCount instead of total
    return {
      data: productions,  // Array of data
      rowCount,           // Total number of items (renamed from total to rowCount)
      currentPage: page,   // Current page number
      pageSize,            // Page size
    };
  }
  
    async remove(id: string): Promise<void> {
      const entity = await this.denominationProduitsRepository.findOneBy({ id });
      await this.denominationProduitsRepository.remove(entity); // Remove the entity
  }
  
}
