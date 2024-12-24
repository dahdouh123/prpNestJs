import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApplicationUserRole } from './application-user-role.entity'; // Import the ApplicationUserRole entity

@Entity('application_role')
export class ApplicationRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => ApplicationUserRole, (userRole) => userRole)
  userRoles: ApplicationUserRole[];
}
