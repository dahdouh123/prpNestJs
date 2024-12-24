// src/surveys/surveys.controller.ts
import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { SocieteService } from './societe.service';
import { CreateSocieteDto } from './entities/dto/create-societe.dto';

@Controller('api/societe')
export class SocieteController {
  constructor(private readonly socService: SocieteService) {}

  @Post()
  create(@Body() createSurveyDto: CreateSocieteDto) {
    return this.socService.create(createSurveyDto);
  }

  @Get(':acsHoldingId')
  async getSurveyByAcsHoldingId(@Param('acsHoldingId') acsholdingId: string) {
    return this.socService.findByAcsHoldingId(acsholdingId);
  }
}
