// update-prix.dto.ts
import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { LignesPrixDto } from './create-prix.dto';

export class UpdatePrixDto {
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
  lignesPrix?: LignesPrixDto[]; // Assuming you have a DTO for LignesPrix

  @IsOptional()
  @IsBoolean()
  estValide?: boolean;
}

// Define the LignesPrixDto similarly based on your requirements
