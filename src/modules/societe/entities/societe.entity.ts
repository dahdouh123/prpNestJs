// src/surveys/entities/survey.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Societe {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  acsHoldingId: string;
  @Column()
  entreprise: string;

  @Column()
  nis: string;

  @Column()
  naaDivision: string;

  @Column()
  naaGroup: string;

  @Column()
  groupe: string;

  @Column()
  adresse: string;

  @Column()
  wilaya: string;

  @Column()
  codePostal: string;

  @Column()
  telephone: string;

  @Column({ nullable: true })
  fax?: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  siteWeb?: string;

  @Column()
  activitePrincipale: string;

  @Column({ nullable: true })
  activiteSecondaire?: string;

  @Column('int')
  effectifTotal: number;

  @Column('int')
  effectifPermanents: number;

  @Column('int')
  nombreUnites: number;
}
