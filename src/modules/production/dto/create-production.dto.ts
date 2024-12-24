// src/production/dto/insert-production.dto.ts
import { IsNotEmpty, IsUUID, IsArray, IsString, IsOptional, IsNumber, IsDecimal } from 'class-validator';

export class InsertProductionDto {
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
  @IsString()
  @IsOptional()
  urlecoffe?: string; // Change to string to hold the file path after upload
  @IsArray()
  @IsNotEmpty({ each: true }) // Ensure at least one line is provided
  lignesProduction: LignesProductionDto[]; // Use the LignesProduction DTO here

  @IsOptional()
  estValide?: boolean; // Optional boolean
}

// src/production/dto/lignes-production.dto.ts
// lignes-production.dto.ts

export class LignesProductionDto {
  @IsOptional()
  @IsString()
  idLigne: string;

  @IsOptional()
  @IsNumber()
  num: number;

  @IsOptional()
  @IsString()
  denomVariete: string;

  @IsOptional()
  @IsString()
  uniteMesureKilo: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' })
  stockTrimestrePrec: number;
  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' })
  stockTrimestrePrecT: number;

  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' })
  prodTrimestreQteC2: number;

  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' })
  prodTrimestreQteC2T: number;

  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' })
  prodTrimestreValMDA: number;

  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' })
  venteTrimestreQteD3: number;
  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' })
  venteTrimestreQteD3T: number;

  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' })
  stockFinTrimestreReelQteF: number;

  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' })
  stockFinTrimestreReelQteFT: number;

  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' })
  stockFinTrimestreTheo: number;
  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' })
  stockFinTrimestreTheoT: number;

  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' })
  ecartStockReelTheo: number;
  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' })
  ecartStockReelTheoT: number;
  @IsOptional()
  @IsString()
  commentEcart: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' })
  capProdQteG: number;
  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' })
  capProdQteGT: number;
  
  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' })
  rappelQteProductionTrimestrePrecQteh: number;
  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' })
  rappelQteProductionTrimestrePrecQtehT: number;
  @IsOptional()
  @IsString()
  obs: string;

  // Optionally, you can include a reference to the associated Production entity ID if needed
  @IsOptional()
  @IsString()
  productionId: string;
}
