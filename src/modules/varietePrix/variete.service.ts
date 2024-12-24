import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VarieteProduitsRepository } from './repo/varieteRepo';
import { CreateVarieteProduitsDto } from './dto/CreateVarietePrixDto';
import { VarieteProduitsDto } from './dto/VarieteProduitsDto';
import { VarieteProduits } from './entities/variete-produits.entity';
import { GetVarietesByAcsHoldingDto } from './dto/get-varietes-by-acs-holding.dto';

@Injectable()
export class VarieteProduitsService {
    constructor(
        @InjectRepository(VarieteProduits,'prpacsidentity')
        private readonly VarieteProduitsRepository: VarieteProduitsRepository,
    ) {}

    async create(createDto: CreateVarieteProduitsDto): Promise<VarieteProduitsDto> {
        const { acsHoldingId, variete, unite,coeifOfConv,observation, codeNPA } = createDto;
        
        // Check if a record with the same denomination already exists
        
    
        // Create and save the new denomination if it doesn't exist
        const newVar = this.VarieteProduitsRepository.create({
            acsHoldingId,
            variete,
            unite,
            coeifOfConv,
            observation,
            codeNPA,
        });
        await this.VarieteProduitsRepository.save(newVar);
        
        return newVar;
    }


    async createMany(createDtos: CreateVarieteProduitsDto[]): Promise<VarieteProduitsDto[]> {
        const createdVarieteProduits: VarieteProduitsDto[] = [];
        
        for (const createDto of createDtos) {
            console.log("cre",createDto);
            const existingVarietes = await this.VarieteProduitsRepository.findOne({ where: { variete:createDto.variete}})
             ;
           if(!existingVarietes){
            const createdVariete = await this.create(createDto); // Assuming `create` method handles single creation
            createdVarieteProduits.push(createdVariete);
           }
          
        }

        return createdVarieteProduits;
    }





    async findAll(page = 1, limit = 10): Promise<VarieteProduitsDto[]> {
        const skippedItems = (page - 1) * limit;
        const totalCount = await this.VarieteProduitsRepository.count();

        const entities = await this.VarieteProduitsRepository.find({
            skip: skippedItems,
            take: limit,
        });

        if (!entities) {
            throw new NotFoundException('Entities not found');
        }

        return entities;
    }

    async findOne(id: string): Promise<VarieteProduitsDto> {
      const entity = await this.VarieteProduitsRepository.findOneBy({ id });
        
        if (!entity) {
            throw new NotFoundException(`Entity with ID ${id} not found`);
        }

        return entity;
    }

    async update(id: string, updateDto: CreateVarieteProduitsDto): Promise<VarieteProduitsDto> {
        const { acsHoldingId, variete, unite , coeifOfConv , codeNPA } = updateDto;
        const entity = await this.VarieteProduitsRepository.preload({
            id:id,
            acsHoldingId,
            variete,
            unite,
            coeifOfConv,
            codeNPA,
        });

        if (!entity) {
            throw new NotFoundException(`Entity with ID ${id} not found`);
        }

        return await this.VarieteProduitsRepository.save(entity);
    }


    async getByAcsHolding(dto: GetVarietesByAcsHoldingDto) {
      const { acsHoldingId, page, pageSize } = dto;

      const [varietes, total] = await this.VarieteProduitsRepository.findAndCount({
          where: { acsHoldingId },  // Filtering by AcsHoldingId
          skip: (page - 1) * pageSize,
          take: pageSize,
      });

      if (varietes.length === 0) {
          throw new NotFoundException(`No varietes found for AcsHoldingId ${acsHoldingId}`);
      }

      return {
          items: varietes,
          totalItems: total,
          currentPage: page,
          totalPages: Math.ceil(total / pageSize),
      };
  }



  async getProductions(
    page: number,
    pageSize: number,
    acsHoldingId: string
  ): Promise<{ data: VarieteProduitsDto[]; rowCount: number; currentPage: number; pageSize: number }> {
    const [productions, rowCount] = await this.VarieteProduitsRepository.findAndCount({
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
      const entity = await this.VarieteProduitsRepository.findOneBy({ id });
      await this.VarieteProduitsRepository.remove(entity); // Remove the entity
  }
  
}
