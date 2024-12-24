import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionController } from './production.controller';
import { Production } from './entities/production.entity';
import { LignesProduction } from './entities/lignes-production.entity';
import { ProductionService } from './production.service';
import { Repository } from 'typeorm';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer'; // Import multer
import { DenominationProduits } from 'modules/denomination/entities/denomination-produits.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DenominationProduits],'prpacsidentity'),TypeOrmModule.forFeature([Production,LignesProduction],'prpacs'), MulterModule.register({
    dest: 'src/uploads', // Specify the destination for uploaded files
  }),
  MulterModule.register({
    storage: multer.diskStorage({
      destination: 'src/uploads', // Path where files will be stored
      filename: (req, file, cb) => {
        // Customize the filename if needed
        cb(null, file.originalname);
      },
    }),
  }),
],
  providers: [ProductionService ,Repository ],
  controllers: [ProductionController],
})
export class ProductionModule {}
