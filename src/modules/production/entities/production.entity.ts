import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { LignesProduction } from './lignes-production.entity';

@Entity('production')
export class Production {
  @PrimaryGeneratedColumn('uuid')
  idDoc: number;

  @Column({ nullable: true })
  affectationGroupe: string;

  @Column({ nullable: true })
  affectationEPE: string;

  @Column({ nullable: true })
  affectationFiliale: string;

  @Column()
  idUtilisateur: string;

  @Column({ nullable: true })
  trimestre: string;

  @Column({ nullable: true })
  exercice: string;

  @Column({ nullable: true })
  urlecoffe: string;

  @OneToMany(() => LignesProduction, (lignesProduction) => lignesProduction.production, {
    cascade: true, // Enable cascading delete
  })
  lignesProduction: LignesProduction[];

  @Column({ default: false })
  estValide: boolean;
}
