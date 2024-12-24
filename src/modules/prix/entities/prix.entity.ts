import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LignesPrix } from './lignes-prix.entity';

@Entity()
export class Prix {
  @PrimaryGeneratedColumn('uuid')
  idDoc: string;  // Corresponds to Guid in .NET

  @Column({ type: 'varchar', length: 255 })
  affectationGroupe: string;

  @Column({ type: 'varchar', length: 255 })
  affectationEPE: string;

  @Column({ type: 'varchar', length: 255 })
  affectationFiliale: string;

  @Column({ type: 'uuid' })
  idUtilisateur: string;

  @Column({ type: 'varchar', length: 4 })
  exercice: string;

  @Column({ type: 'varchar', length: 2 })
  trimestre: string;

  @OneToMany(() => LignesPrix, (lignesPrix) => lignesPrix.prix, {
    cascade: true, // Enable cascading delete
  })
  lignesPrix: LignesPrix[];

  @Column({ type: 'boolean' })
  estValide: boolean;
}
