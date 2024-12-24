// src/surveys/surveys.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Societe } from './entities/societe.entity';
import { CreateSocieteDto } from './entities/dto/create-societe.dto';

@Injectable()
export class SocieteService {
  constructor(
    @InjectRepository(Societe ,'prpacsidentity'
    )
    private readonly societeRepository: Repository<Societe>,
  ) {}

  async create(createsocieteDto: CreateSocieteDto): Promise<Societe> {
    // Check if a record with the same acsHoldingId already exists
    const existingRecord = await this.societeRepository.findOne({ where: { acsHoldingId: createsocieteDto.acsHoldingId } });

    if (existingRecord) {
        console.log("Record exists, updating data.");

        // Update the existing record with the new data
        return await this.societeRepository.save({
            ...existingRecord,
            ...createsocieteDto // This will override the existing fields with the new values
        });
    } else {
        // Create a new record if none exists
        console.log("No existing record, creating a new entry.");
        const newSurvey = this.societeRepository.create(createsocieteDto);
        return await this.societeRepository.save(newSurvey);
    }
}



  async findByAcsHoldingId(acsHoldingId: string): Promise<Societe> {
    return this.societeRepository.findOne({ where: { acsHoldingId:acsHoldingId } });
  }
}
