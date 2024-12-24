import { LignesPrix } from "modules/prix/entities/lignes-prix.entity";
import { LignesProduction } from "modules/production/entities/lignes-production.entity";

export interface ConsolidePRP {
    productionDoc?: string; // extracted from production table
    prixDoc?: string; // extracted from prix table
    affectationGroupe: string; // extracted from one of them
    affectationEPE: string; // extracted from one of them
    affectationFiliale: string; // extracted from one of them
    idUtilisateur: string; // extracted from one of them
    exercice: string; // extracted from one of them
    trimestre: string; // extracted from one of them
    isValide:boolean;
    lignesPrix: LignesPrix[]; // included with prix table
    lignesProduction: LignesProduction[]; // included with production table
    urlecoffe:string;
  }