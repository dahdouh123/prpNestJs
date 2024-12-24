// src/surveys/dto/create-survey.dto.ts
export class CreateSocieteDto {
    acsHoldingId:string;
    entreprise: string;
    nis: string;
    naaDivision: string;
    naaGroup: string;
    groupe: string;
    adresse: string;
    wilaya: string;
    codePostal: string;
    telephone: string;
    fax?: string;
    email: string;
    siteWeb?: string;
    activitePrincipale: string;
    activiteSecondaire?: string;
    effectifTotal: number;
    effectifPermanents: number;
    nombreUnites: number;
  }
  