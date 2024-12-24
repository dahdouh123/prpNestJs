// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationUser } from './entities/application-user.entity';
import { ACSHolding } from './entities/acsholding.entity';
import { LoginDto } from './dto/login.dto';
import { Guid } from 'guid-typescript';
import { identity } from 'rxjs';
import { Identity } from './dto/identity.dto';
import { ApplicationRole } from './entities/ApplicationRole';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(ApplicationUser, 'prpacsidentity') 
    private userRepository: Repository<ApplicationUser>,
    @InjectRepository(ApplicationRole, 'prpacsidentity') 
    private rolesRepository: Repository<ApplicationRole>,
    @InjectRepository(ACSHolding, 'prpacsidentity') 
    private acsHoldingRepository: Repository<ACSHolding>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    
    // Fetch the user without affiliation
    const userwithout = await this.userRepository.findOne({ where: { email } });
    
    // Fetch the user with affiliation and userRoles (if needed)
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['affiliation', 'userRoles','userRoles.applicationRole'], // Make sure 'userRoles' relation exists
    });



    
    // Check if user exists
    if (!user) {
            throw new UnauthorizedException("User not found");
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    
    // Check if password is valid and user is active
    if (!isPasswordValid || !user.isActive) {
            throw new UnauthorizedException("Invalid password or user is inactive");
    }
    
    // If everything is valid, return the user
    return user;
  }
  async  getEmailOfUser(userPromise: Promise<ApplicationUser>): Promise<Guid | null> {
    try {
        // Wait for the promise to resolve
        const user = await userPromise;

        // Access the email attribute
        return user.ACSHoldingId;
    } catch (error) {
        console.error("Error retrieving user:", error);
        return null; // or handle the error as needed
    }
  }
  async login(loginDto: LoginDto) {
    // Validate the user's credentials
    const user = await this.validateUser(loginDto.email, loginDto.password);
        const email = await this.getEmailOfUser(user);
    const roles = user.userRoles.map(userRole => ({
      id: userRole.applicationRole.id,
      roleName: userRole.applicationRole.name, // Adjust based on your ApplicationRole entity
    }));
   
    // Check if the ACSHoldingId exists
      user.ACSHoldingId =email;
    // Generate JWT payload with roles
  
  
   
      // Retrieve affiliation data
    const affiliation = await this.acsHoldingRepository.findOne({ where: { id: user.ACSHoldingId } });
      
    if (!affiliation) {
      console.error("Affiliation not found for ACSHoldingId:", user.ACSHoldingId);
      throw new UnauthorizedException("Affiliation not found");
    }
  
    // Generate JWT token
    const token = this.jwtService.sign({ id: user.id }); // Changed to sign with an object
         var identity :Identity = {
      id:user.id,
      token:token,
      userName:user.userName,
      phoneNumber:user.phoneNumber,
      roles:roles,
      logo:null,
      fullName:user.fullName,
      affiliaion:affiliation
     }
     
    // Return the login response with token and user data
    return identity
    };
  }
  

