// src/dashboard/dashboard.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ProdVenteStats } from './dto/prodvente.dto';

@Controller('api/dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get('stats')
   
    getProdVenteStats(
        @Query('exercice') exercice?: string,
        @Query('affectationGroupe') affectationGroupe?: string,
    ): Promise<any> {
        return this.dashboardService.getProdVenteStats(exercice , affectationGroupe);
    }
}