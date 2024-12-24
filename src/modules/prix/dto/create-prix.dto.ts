// src/production/dto/insert-production.dto.ts
import { IsNotEmpty, IsUUID, IsArray, IsString, IsOptional, IsNumber, IsDecimal, IsDate } from 'class-validator';
import { Prix } from '../entities/prix.entity';

export class InsertPrixDto {
  @IsString()
  @IsOptional()
  affectationGroupe?: string;

  @IsString()
  @IsOptional()
  affectationEPE?: string;

  @IsString()
  @IsOptional()
  affectationFiliale?: string;

  @IsUUID()
  idUtilisateur: string; // Use IsUUID to validate UUID

  @IsString()
  @IsNotEmpty()
  trimestre: string;

  @IsString()
  @IsNotEmpty()
  exercice: string;

  @IsArray()
  @IsNotEmpty({ each: true }) // Ensure at least one line is provided
  lignesPrix: LignesPrixDto[]; // Use the LignesProduction DTO here

  @IsOptional()
  estValide?: boolean; // Optional boolean
}

// src/production/dto/lignes-production.dto.ts
// lignes-production.dto.ts

export class LignesPrixDto {
  @IsOptional()
  @IsUUID()
  idLigne?: string;

  @IsNumber()
  num: number;

  @IsString()
  denomVariete: string;
  @IsString()
  codeNPA: string;
  @IsString()
  uniteMesure: string;

  @IsNumber()
  mrQuantite: number;

  @IsNumber()
  mrPuHt: number;

  @IsNumber()
  mrMontantHt: number;
  @IsNumber()
  mrMontantTTC: number;
  @IsNumber()
  
  deQuantite: number;

  @IsNumber()
  deValMDA: number;

  @IsNumber()
  deValDevise: number;

  @IsNumber()
  trimPrecQte: number;

  @IsNumber()
  trimPrecPUHT: number;

  @IsNumber()
  trimPrecMontantHT: number;
  @IsNumber()
  trimPrecMontantTTC: number;
  @IsDate()
  dateEntVigeur: Date;

  @IsOptional()
  @IsString()
  obs?: string;

  @IsUUID()
  prixId: string;
  

  prix:Prix
}
