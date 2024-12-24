// update-production.dto.ts
import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { LignesProductionDto } from 'modules/account/account/dto/create-production.dto';

export class UpdateProductionDto {
  @IsOptional()
  @IsString()
  affectationGroupe?: string;

  @IsOptional()
  @IsString()
  affectationEPE?: string;

  @IsOptional()
  @IsString()
  affectationFiliale?: string;

  @IsOptional()
  @IsString()
  idUtilisateur?: string;

  @IsOptional()
  @IsString()
  trimestre?: string;

  @IsOptional()
  @IsString()
  exercice?: string;

  @IsOptional()
  lignesProduction?: LignesProductionDto[]; // Assuming you have a DTO for LignesProduction

  @IsOptional()
  @IsBoolean()
  estValide?: boolean;
}

// Define the LignesProductionDto similarly based on your requirements
