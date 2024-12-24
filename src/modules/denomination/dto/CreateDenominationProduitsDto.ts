import { ACSHolding } from "modules/account/account/entities/acsholding.entity";

export class CreateDenominationProduitsDto {
    readonly acsHoldingId: string;
    readonly id:string;
    readonly denomination: string;
    readonly unite: string;
    readonly capaciteProd: number;
    readonly coeifOfConv :number;
    readonly acsHolding:ACSHolding;
    readonly stockInitial:number;
}