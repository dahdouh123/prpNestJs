import { ACSHolding } from "../entities/acsholding.entity";

export type Identity = {
    id: string;
    token: string;
    userName: string;
    logo:string;
    roles: string[];
    fullName: string;
    phoneNumber: string;
    photoUrl?: string;
    mac?:string;
    affiliaion : ACSHolding ;
  };
  