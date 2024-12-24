import { DataSource } from 'typeorm';
import { Production } from './modules/production/entities/production.entity';
import { LignesProduction } from './modules/production/entities/lignes-production.entity';
import { Prix } from './modules/prix/entities/prix.entity';
import { LignesPrix } from './modules/prix/entities/lignes-prix.entity';

export const AppDataSource = new DataSource({
  type: 'mysql', // e.g., 'mysql', 'postgres', etc.
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'prpacs',
  entities: [Production,LignesProduction,Prix,LignesPrix], // Add all your entities here
  migrations: ['src/database/migrations/*.ts'], // Ensure this points to your migrations directory
  synchronize: true,
});
