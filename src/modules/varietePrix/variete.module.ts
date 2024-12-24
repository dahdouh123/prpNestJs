import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VarieteProduitsController } from './variete.controller';
import { VarieteProduitsService } from './variete.service';
import { VarieteProduits } from './entities/variete-produits.entity';
import { VarieteProduitsRepository } from './repo/varieteRepo';
import { ACSHolding } from '../account/account/entities/acsholding.entity';
import { AuthModule } from 'modules/account/account/auth.module';


@Module({
    imports: [TypeOrmModule.forFeature([VarieteProduits,ACSHolding],'prpacsidentity'),AuthModule], // Register the entity
    providers: [VarieteProduitsService , VarieteProduitsRepository],
    controllers: [VarieteProduitsController],
})
export class VarieteProduitsModule {}
