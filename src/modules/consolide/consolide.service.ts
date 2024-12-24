// src/consolide/consolide.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prix } from 'modules/prix/entities/prix.entity';
import { Production } from 'modules/production/entities/production.entity';
import { Like, Repository } from 'typeorm';
import { ConsolidePRP } from './dto/consolide-prp.dto';
import { LignesPrix } from 'modules/prix/entities/lignes-prix.entity';
import { LignesProduction } from 'modules/production/entities/lignes-production.entity';


@Injectable()
export class ConsolideService {
  constructor(
    @InjectRepository(Production, 'prpacs')
    private readonly productionRepository: Repository<Production>,
    @InjectRepository(Prix, 'prpacs')
    private readonly prixRepository: Repository<Prix>,
   
  ) {}
   isGuid(value: string): boolean {
    console.log("value to test",value);
    const guidRegex = /^[{(]?([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})[)}]?$/i;
    return guidRegex.test(value);
}
async getConsolideData(
    page: number,
    pageSize: number,
    idUtilisateur: string,
    affectation?:string,
    exercice?: string,
    trimestre?: string,
  ): Promise<{ data: ConsolidePRP[]; total: number }> {
    console.log("page , page size",page , pageSize);
    // Check if the user ID is a GUID
    if (this.isGuid(idUtilisateur)) {
      console.log("idUSER",idUtilisateur);
      const productions = await this.productionRepository.find({
        where: { idUtilisateur }, // Filter by idUtilisateur
        relations: ['lignesProduction'], // Load related lignesProduction
      });
  
      const prixs = await this.prixRepository.find({
        where: { idUtilisateur }, // Filter by idUtilisateur
        relations: ['lignesPrix'], // Load related lignesPrix
      });
  
      // Grouping the results by exercice, trimestre, and idUtilisateur
      const groupedResults: { [key: string]: ConsolidePRP } = {};
      console.log("productions",productions);
      productions.forEach((production) => {
        const key = `${production.exercice}-${production.trimestre}-${production.idUtilisateur}`;
  
        if (!groupedResults[key]) {
          groupedResults[key] = {
            productionDoc: production.idDoc.toString(),
            prixDoc: null, // Will be filled later
            affectationGroupe: production.affectationGroupe,
            affectationEPE: production.affectationEPE,
            affectationFiliale: production.affectationFiliale,
            urlecoffe: production.urlecoffe,
            idUtilisateur: production.idUtilisateur,
            exercice: production.exercice,
            trimestre: production.trimestre,
            isValide: production.estValide,
            lignesPrix: [],
            lignesProduction: production.lignesProduction,
          };
        }
  
        // Find related prix for the current production
        const relatedPrix = prixs.find(prix =>
          prix.exercice === production.exercice && prix.trimestre === production.trimestre
        );
  
        if (relatedPrix) {
          groupedResults[key].prixDoc = relatedPrix.idDoc;
          groupedResults[key].lignesPrix.push(...relatedPrix.lignesPrix);
        }
      });
  
      // Convert the grouped results into an array
      const resultArray = Object.values(groupedResults);
  
      // Filter results based on exercice and trimestre if provided
      const filteredResults = resultArray.filter(result => {
        const matchesExercice = exercice ? result.exercice === exercice : true;
        const matchesTrimestre = trimestre ? result.trimestre === trimestre : true;
        return matchesExercice && matchesTrimestre && result.lignesPrix.length > 0 && result.lignesProduction.length > 0;
      });
  
      // Implementing pagination
      const total = filteredResults.length;
      const startIndex = (page - 1) * pageSize;
      const endIndex = parseInt(startIndex.toString()) + parseInt(pageSize.toString());
  
      const paginatedResults = filteredResults.slice(startIndex, endIndex);
      return { data: paginatedResults, total };
  
    } else {
        if(idUtilisateur !='Holding ACS'){
      
      // Similar logic for the case where idUtilisateur is not a GUID
      const productions = await this.productionRepository.find({
        where: { affectationGroupe: idUtilisateur }, // Filter by idUtilisateur
        relations: ['lignesProduction'], // Load related lignesProduction
      });
       console.log("productions in else",productions);
      const prixs = await this.prixRepository.find({
        where: { affectationGroupe: idUtilisateur }, // Filter by idUtilisateur
        relations: ['lignesPrix'], // Load related lignesPrix
      });
  
      const groupedResults: { [key: string]: ConsolidePRP } = {};
  
      productions.forEach((production) => {
        const key = `${production.exercice}-${production.trimestre}-${production.idUtilisateur}`;
  
        if (!groupedResults[key]) {
          groupedResults[key] = {
            productionDoc: production.idDoc.toString(),
            prixDoc: null, // Will be filled later
            affectationGroupe: production.affectationGroupe,
            affectationEPE: production.affectationEPE,
            affectationFiliale: production.affectationFiliale,
            urlecoffe: production.urlecoffe,
            idUtilisateur: production.idUtilisateur,
            exercice: production.exercice,
            trimestre: production.trimestre,
            isValide: production.estValide,
            lignesPrix: [],
            lignesProduction: production.lignesProduction,
          };
        }
  
        const relatedPrix = prixs.find(prix =>
          prix.exercice === production.exercice && prix.trimestre === production.trimestre
        );
  
        if (relatedPrix) {
          groupedResults[key].prixDoc = relatedPrix.idDoc;
          groupedResults[key].lignesPrix.push(...relatedPrix.lignesPrix);
        }
      });
  
      const resultArray = Object.values(groupedResults);
  
      // Filter results based on exercice and trimestre if provided
      const filteredResults = resultArray.filter(result => {
        const matchesExercice = exercice ? result.exercice === exercice : true;
        const matchesTrimestre = trimestre ? result.trimestre === trimestre : true;
        return matchesExercice && matchesTrimestre && result.lignesPrix.length > 0 && result.lignesProduction.length > 0;
      });
  
      // Implementing pagination
      const total = filteredResults.length;
      const startIndex = (page - 1) * pageSize;
      const endIndex = parseInt(startIndex.toString()) + parseInt(pageSize.toString());
      console.log("page",page);
     console.log("page size",pageSize);
     console.log("start index",startIndex);
     console.log("end index",endIndex);

      const paginatedResults = filteredResults.slice(startIndex, endIndex);
      return { data: paginatedResults, total  };
    }else
    {
        if( affectation !='')
            {
              // Similar logic for the case where idUtilisateur is not a GUID
      const productions = await this.productionRepository.find({
        where: {
            [affectation.includes('GROUPE') ? 'affectationGroupe' : 'affectationEPE']: Like(`%${affectation}%`)
        },

        relations: ['lignesProduction'], // Load related lignesProduction
      });
      const prixs = await this.prixRepository.find({
        where: {
            [affectation.includes('GROUPE') ? 'affectationGroupe' : 'affectationEPE']: Like(`%${affectation}%`)
        },
        relations: ['lignesPrix'], // Load related lignesPrix
      });
  
      const groupedResults: { [key: string]: ConsolidePRP } = {};
  
      productions.forEach((production) => {
        const key = `${production.exercice}-${production.trimestre}-${production.idUtilisateur}`;
  
        if (!groupedResults[key]) {
          groupedResults[key] = {
            productionDoc: production.idDoc.toString(),
            prixDoc: null, // Will be filled later
            affectationGroupe: production.affectationGroupe,
            affectationEPE: production.affectationEPE,
            affectationFiliale: production.affectationFiliale,
            urlecoffe: production.urlecoffe,
            idUtilisateur: production.idUtilisateur,
            exercice: production.exercice,
            trimestre: production.trimestre,
            isValide: production.estValide,
            lignesPrix: [],
            lignesProduction: production.lignesProduction,
          };
        }
  
        const relatedPrix = prixs.find(prix =>
          prix.exercice === production.exercice && prix.trimestre === production.trimestre
        );
  
        if (relatedPrix) {
          groupedResults[key].prixDoc = relatedPrix.idDoc;
          groupedResults[key].lignesPrix.push(...relatedPrix.lignesPrix);
        }
      });
      console.log("grouped results",groupedResults);

      const resultArray = Object.values(groupedResults);
      console.log("result array",resultArray);
      // Filter results based on exercice and trimestre if provided
      const filteredResults = resultArray.filter(result => {
        const matchesExercice = exercice ? result.exercice === exercice : true;
        const matchesTrimestre = trimestre ? result.trimestre === trimestre : true;
        return matchesExercice && matchesTrimestre && result.lignesPrix.length > 0 && result.lignesProduction.length > 0;
      });
  
      // Implementing pagination
      const total = filteredResults.length;
      const startIndex = (page - 1) * pageSize;
      const endIndex = parseInt(startIndex.toString()) + parseInt(pageSize.toString());
      console.log("page",page);
     console.log("page size",pageSize);
     console.log("start index",startIndex);
     console.log("end index",endIndex);

      const paginatedResults = filteredResults.slice(startIndex, endIndex);
      console.log("data final",paginatedResults);

      return { data: paginatedResults, total  };  
            }
            else
            {
                // Similar logic for the case where idUtilisateur is not a GUID
      const productions = await this.productionRepository.find({
        relations: ['lignesProduction'], // Load related lignesProduction
      });
  
      const prixs = await this.prixRepository.find({
        relations: ['lignesPrix'], // Load related lignesPrix
      });
  
      const groupedResults: { [key: string]: ConsolidePRP } = {};
  
      productions.forEach((production) => {
        const key = `${production.exercice}-${production.trimestre}-${production.idUtilisateur}`;
  
        if (!groupedResults[key]) {
          groupedResults[key] = {
            productionDoc: production.idDoc.toString(),
            prixDoc: null, // Will be filled later
            affectationGroupe: production.affectationGroupe,
            affectationEPE: production.affectationEPE,
            affectationFiliale: production.affectationFiliale,
            urlecoffe: production.urlecoffe,
            idUtilisateur: production.idUtilisateur,
            exercice: production.exercice,
            trimestre: production.trimestre,
            isValide: production.estValide,
            lignesPrix: [],
            lignesProduction: production.lignesProduction,
          };
        }
  
        const relatedPrix = prixs.find(prix =>
          prix.exercice === production.exercice && prix.trimestre === production.trimestre
        );
  
        if (relatedPrix) {
          groupedResults[key].prixDoc = relatedPrix.idDoc;
          groupedResults[key].lignesPrix.push(...relatedPrix.lignesPrix);
        }
      });
  
      const resultArray = Object.values(groupedResults);
  
      // Filter results based on exercice and trimestre if provided
      const filteredResults = resultArray.filter(result => {
        const matchesExercice = exercice ? result.exercice === exercice : true;
        const matchesTrimestre = trimestre ? result.trimestre === trimestre : true;
        return matchesExercice && matchesTrimestre && result.lignesPrix.length > 0 && result.lignesProduction.length > 0;
      });
  
      // Implementing pagination
      const total = filteredResults.length;
      const startIndex = (page - 1) * pageSize;
      const endIndex = parseInt(startIndex.toString()) + parseInt(pageSize.toString());
      console.log("page",page);
     console.log("page size",pageSize);
     console.log("start index",startIndex);
     console.log("end index",endIndex);
      const paginatedResults = filteredResults.slice(startIndex, endIndex);

      return { data: paginatedResults, total  };    
            }
        }
  }
}
}
