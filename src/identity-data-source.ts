import { DataSource } from 'typeorm';
import { ApplicationUser } from './modules/account/account/entities/application-user.entity';
import { ApplicationRole } from './modules/account/account/entities/ApplicationRole';
import { ApplicationUserRole } from './modules/account/account/entities/application-user-role.entity';
import { DenominationProduits } from './modules/denomination/entities/denomination-produits.entity';
import { ACSHolding } from './modules/account/account/entities/acsholding.entity';
import { Societe } from './modules/societe/entities/societe.entity';
import { VarieteProduits } from './modules/varietePrix/entities/variete-produits.entity';

export const AppDataSource = new DataSource({
  type: 'mysql', // e.g., 'mysql', 'postgres', etc.
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'prpacsidentity',
  entities: [ACSHolding,ApplicationUser,ApplicationRole,ApplicationUserRole,DenominationProduits,Societe,VarieteProduits], // Add all your entities here
  migrations: ['src/database/identity/migrations/*.ts'], // Ensure this points to your migrations directory
  synchronize: true,
});
