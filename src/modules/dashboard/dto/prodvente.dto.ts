

export interface ProdVenteStats {
   

    idUtilisateur: string; // extracted from one of them
    filialesStats: FilialesStats[]
  }
  export interface  FilialesStats {
   
    affectationFiliale: string; // extracted from one of them
    trimestre:number;
    totalProdTrim: number; // extracted from one of them
    totalVenteTrim: number; // extracted from one of them
    nbrProduits : number;
    prodStats:ProduitStats [];
  }
 

  export interface ProduitStats {
   denomination : string ; 
   prodTrim:number;
   venteTrim:number;
   capacite:number;
  }