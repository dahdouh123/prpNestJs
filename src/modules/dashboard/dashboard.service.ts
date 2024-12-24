import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LignesProduction } from 'modules/production/entities/lignes-production.entity';
import { Production } from 'modules/production/entities/production.entity';
import { Brackets, Repository } from 'typeorm';
import { FilialesStats, ProduitStats, ProdVenteStats } from './dto/prodvente.dto';


@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(Production,'prpacs')
        private productionRepository: Repository<Production>,
        @InjectRepository(LignesProduction,'prpacs')
        private lignesProductionRepository: Repository<LignesProduction>,
    ) {}

    async getProdVenteStats(exercice: string, affectationGroupe: string): Promise<ProdVenteStats[]> {
        const isGroupe = affectationGroupe.includes("GROUPE");
        const isEPE = affectationGroupe.includes("EPE");
        const isFiliale = affectationGroupe.includes("FILIALE");
        const affectationFilialesended =  isFiliale ? affectationGroupe.replace("FILIALE","") : "";
        const queryBuilder = this.productionRepository
        .createQueryBuilder('production')
        .leftJoinAndSelect('production.lignesProduction', 'lignes_production')
        .where('production.exercice = :exercice', { exercice });

    if (isGroupe || isEPE || isFiliale) {
        console.log("affectation",affectationGroupe);
        queryBuilder.andWhere(isGroupe 
            ? 'production.affectationGroupe LIKE :affectationGroupe' : isEPE ?
             'production.affectationEPE LIKE :affectationGroupe' : '"FILIALE "+production.affectationFiliale LIKE :affectationGroupe'   , 
            { affectationGroupe: `%${affectationGroupe}%` });
    }
    
    const productions = await queryBuilder
        .orderBy('production.affectationFiliale', 'ASC')
        .addOrderBy('production.trimestre', 'ASC')
        .getMany();
        
        console.log("productions", productions);
        
        const groupedStatsByFiliale = new Map<string, { totalProdTrim: number, totalVenteTrim: number, nbrProduits: number, trimestreStats: Map<number, { totalProdTrim: number, totalVenteTrim: number, nbrProduits: number, prodStats: ProduitStats[] }> }>();
    
        productions.forEach(production => {
            const key =  isGroupe ? production.affectationFiliale : isEPE ? production.affectationEPE :   isFiliale ? production.affectationFiliale : (production.affectationGroupe ||  production.affectationEPE ) ;
    
            if (!groupedStatsByFiliale.has(key)) {
                groupedStatsByFiliale.set(key, {
                    totalProdTrim: 0,
                    totalVenteTrim: 0,
                    nbrProduits: 0,
                    trimestreStats: new Map<number, { totalProdTrim: number, totalVenteTrim: number, nbrProduits: number, prodStats: ProduitStats[] }>(),
                });
            }
    
            const filialesStats = groupedStatsByFiliale.get(key)!;
            console.log("grouped filiale by states",groupedStatsByFiliale);
            const totalProdTrim = production.lignesProduction.reduce((total, ligne) => {
                const prodQte = parseFloat(ligne.prodTrimestreQteC2T != null ? ligne.prodTrimestreQteC2T.toString() : "0") || 0; // Convert to number
                return total + prodQte;
            }, 0);
            
            const totalVenteTrim = production.lignesProduction.reduce((total, ligne) => {
                const venteQte = parseFloat(ligne.venteTrimestreQteD3T != null ? ligne.venteTrimestreQteD3T.toString() : "0") || 0; // Convert to number
                return total + venteQte;
            }, 0);
            
            const nbrProduits = production.lignesProduction.length;
    
            // Extract the numeric part of the trimestre (e.g., "T1" -> 1, "T2" -> 2)
            const trimestreKey = parseInt(production.trimestre.replace('T', ''), 10); // Convert "T1" to 1, "T2" to 2, etc.
    
            // Aggregate by trimester
            if (!filialesStats.trimestreStats.has(trimestreKey)) {
                filialesStats.trimestreStats.set(trimestreKey, {
                    totalProdTrim: 0,
                    totalVenteTrim: 0,
                    nbrProduits: 0,
                    prodStats: [],
                });
            }
    
            const trimestreStat = filialesStats.trimestreStats.get(trimestreKey)!;
    
            // Update the aggregated values for the trimester
            trimestreStat.totalProdTrim += totalProdTrim;
            trimestreStat.totalVenteTrim += totalVenteTrim;
            trimestreStat.nbrProduits += nbrProduits;
    
            // Add product stats
            production.lignesProduction.forEach(ligne => {
                trimestreStat.prodStats.push({
                    denomination: ligne.denomVariete,
                    prodTrim: parseFloat(ligne.prodTrimestreQteC2T != null ? ligne.prodTrimestreQteC2T.toString() : "0") || 0, // Convert to number
                    venteTrim: parseFloat(ligne.venteTrimestreQteD3T != null ? ligne.venteTrimestreQteD3T.toString() : "0") || 0, // Convert to number
                    capacite: parseFloat(ligne.capProdQteGT != null ? ligne.capProdQteGT.toString() : "0") || 0, // Convert to number
                });
            });
        });
    
        const prodVenteStats: ProdVenteStats[] = Array.from(groupedStatsByFiliale.entries()).map(([affectationFiliale, stats]) => ({
            idUtilisateur: productions[0].idUtilisateur, // Assuming the same user for all productions
            filialesStats: Array.from(stats .trimestreStats.entries()).map(([trimestre, trimestreStat]) => ({
                affectationFiliale,
                trimestre,
                totalProdTrim: trimestreStat.totalProdTrim,
                totalVenteTrim: trimestreStat.totalVenteTrim,
                nbrProduits: trimestreStat.nbrProduits,
                prodStats: trimestreStat.prodStats,
            })),
        }));
    
        return prodVenteStats;
    }
}