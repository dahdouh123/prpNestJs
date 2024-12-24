import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ApplicationUser } from './entities/application-user.entity'; // Adjust the path accordingly
import { ACSHolding } from './entities/acsholding.entity'; // Adjust the path accordingly
import { AuthController } from './auth.controller'; // Import if you have a controller
import { ApplicationRole } from './entities/ApplicationRole';
import { ApplicationUserRole } from './entities/application-user-role.entity';
import { Repository } from 'typeorm';
import { DenominationProduitsModule } from 'modules/denomination/denom.module';
import { DenominationProduits } from 'modules/denomination/entities/denomination-produits.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [ApplicationUser, ACSHolding,ApplicationRole,DenominationProduits],
      'prpacsidentity' // Specify the correct connection name
    ),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecretKey', // Replace with your own secret
      signOptions: { expiresIn: '60s' }, // Set token expiration time as needed
    })
  ],
  providers: [AuthService],
  controllers: [AuthController], // Include if you have a controller
  exports:[AuthService]
})
export class AuthModule {}
