import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrixController } from './prix.controller';
import { Prix } from './entities/prix.entity';
import { LignesPrix } from './entities/lignes-prix.entity';
import { PrixService } from './prix.service';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Prix,LignesPrix],'prpacs')],
  providers: [PrixService ,Repository ],
  controllers: [PrixController],
})
export class PrixModule {}
