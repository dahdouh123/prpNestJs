import { Module } from '@nestjs/common';
import { SocieteController } from './societe.controller';
import { SocieteService } from './societe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Societe } from './entities/societe.entity';
import { AuthModule } from 'modules/account/account/auth.module';

@Module({
  controllers: [SocieteController],
  providers: [SocieteService],
  imports: [TypeOrmModule.forFeature([Societe],'prpacsidentity'),AuthModule], // Register the entity
})

export class SocieteModule {}
