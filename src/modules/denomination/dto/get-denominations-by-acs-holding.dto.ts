// get-denominations-by-acs-holding.dto.ts
import { IsUUID, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GetDenominationsByAcsHoldingDto {
    @IsUUID()
    acsHoldingId: string;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)  // Maximum page size allowed
    pageSize: number;
}
