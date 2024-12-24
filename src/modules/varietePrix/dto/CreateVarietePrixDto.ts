import { ACSHolding } from "modules/account/account/entities/acsholding.entity";

export class CreateVarieteProduitsDto {
    readonly acsHoldingId: string;
    readonly variete: string;
    readonly unite: string;
    readonly coeifOfConv : number;
    readonly observation:string;
    readonly codeNPA: number;
    readonly acsHolding:ACSHolding
}