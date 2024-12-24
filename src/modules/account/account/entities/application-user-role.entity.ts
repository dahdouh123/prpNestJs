import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { ApplicationUser } from './application-user.entity';
import { ApplicationRole } from './ApplicationRole';

@Entity('application_user_role')
export class ApplicationUserRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ApplicationUser, (user) => user.userRoles, { onDelete: 'CASCADE' })
  user: ApplicationUser;

  @ManyToOne(() => ApplicationRole, (role) => role.userRoles, { onDelete: 'CASCADE' })
  applicationRole: ApplicationRole;

 
}
