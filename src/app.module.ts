import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Production } from './modules/production/entities/production.entity';
import { LignesProduction } from './modules/production/entities/lignes-production.entity';
import { ProductionModule } from './modules/production/production.module';
import { SeedService } from './database/seeds/seed.service';
import { ACSHolding } from './modules/account/account/entities/acsholding.entity';
import { ApplicationRole } from './modules/account/account/entities/ApplicationRole';
import { ApplicationUser } from './modules/account/account/entities/application-user.entity';
import { ApplicationUserRole } from './modules/account/account/entities/application-user-role.entity';
import { AuthModule } from './modules/account/account/auth.module';
import { DenominationProduitsModule } from './modules/denomination/denom.module';
import { DenominationProduits } from './modules/denomination/entities/denomination-produits.entity';
import { Societe } from 'modules/societe/entities/societe.entity';
import { SocieteModule } from 'modules/societe/societe.module';
import { VarieteProduits } from 'modules/varietePrix/entities/variete-produits.entity';
import { Prix } from 'modules/prix/entities/prix.entity';
import { LignesPrix } from 'modules/prix/entities/lignes-prix.entity';
import { VarieteProduitsModule } from 'modules/varietePrix/variete.module';
import { PrixModule } from 'modules/prix/prix.module';
import { ConsolideModule } from 'modules/consolide/consolide.module';
import { DashboardModule } from 'modules/dashboard/dashboard.module';

@Module({
  imports: [
    // First database (Production)
    TypeOrmModule.forRoot({
      name: 'prpacs',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'prpacs',
      entities: [Production, LignesProduction,Prix,LignesPrix], // Production DB entities
      synchronize: false, // Set to false in production
    }),
    
    // Second database (Identity)
    TypeOrmModule.forRoot({
      name: 'prpacsidentity',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'prpacsidentity',
      entities: [ACSHolding, ApplicationRole, ApplicationUser, ApplicationUserRole,DenominationProduits,Societe,VarieteProduits], // Identity DB entities
      synchronize: false, // Set to false in production
    }),
    
    // Register repositories with the connection name for the second database
    TypeOrmModule.forFeature([ACSHolding, ApplicationRole, ApplicationUser, ApplicationUserRole,DenominationProduits,Societe], 'prpacsidentity'),
    
    // Your other modules
    ProductionModule,AuthModule,DenominationProduitsModule,SocieteModule,VarieteProduitsModule,PrixModule,ConsolideModule,DashboardModule
  ],
  
  providers: [SeedService],
})
export class AppModule {}
