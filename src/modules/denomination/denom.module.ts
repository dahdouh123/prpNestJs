import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DenominationProduitsController } from './denom.controller';
import { DenominationProduitsService } from './denom.service';
import { DenominationProduits } from './entities/denomination-produits.entity';
import { DenominationProduitsRepository } from './repo/denomRepo';
import { ACSHolding } from '../account/account/entities/acsholding.entity';
import { AuthModule } from 'modules/account/account/auth.module';


@Module({
    imports: [TypeOrmModule.forFeature([DenominationProduits,ACSHolding],'prpacsidentity'),AuthModule], // Register the entity
    providers: [DenominationProduitsService , DenominationProduitsRepository],
    controllers: [DenominationProduitsController],
})
export class DenominationProduitsModule {}
