import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LignesPrix } from 'modules/prix/entities/lignes-prix.entity';
import { Prix } from 'modules/prix/entities/prix.entity';
import { PrixController } from 'modules/prix/prix.controller';
import { PrixService } from 'modules/prix/prix.service';
import { LignesProduction } from 'modules/production/entities/lignes-production.entity';
import { Production } from 'modules/production/entities/production.entity';
import { ProductionController } from 'modules/production/production.controller';
import { ProductionService } from 'modules/production/production.service';
import { ConsolideController } from './consolide.controller';
import { ConsolideService } from './consolide.service';
import { DenominationProduits } from 'modules/denomination/entities/denomination-produits.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prix, LignesPrix, Production, LignesProduction], 'prpacs' ), TypeOrmModule.forFeature([DenominationProduits],'prpacsidentity'),
  ],
  providers: [ConsolideService , PrixService, ProductionService],
  controllers: [PrixController, ProductionController, ConsolideController],
})
export class ConsolideModule {}