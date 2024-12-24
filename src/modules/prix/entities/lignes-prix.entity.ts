import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Prix } from './prix.entity';

@Entity()
export class LignesPrix {
  @PrimaryGeneratedColumn('uuid')
  idLigne: string;  // Corresponds to Guid in C#

  @Column({ type: 'int' })
  num: number;

  @Column({ type: 'varchar', length: 255 })
  denomVariete: string;
  @Column({ type: 'varchar', length: 255 })
  codeNPA: string;

  @Column({ type: 'varchar', length: 50 })
  uniteMesure: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  mrQuantite: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  mrPuHt: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  mrMontantHt: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  mrMontantTTC: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  deQuantite: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  deValMDA: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  deValDevise: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  trimPrecQte: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  trimPrecPUHT: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  trimPrecMontantHT: number;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  trimPrecMontantTTC: number;

  @Column({ type: 'timestamp' })
  dateEntVigeur: Date;

  @Column({ type: 'text', nullable: true })
  obs: string;

  // Relation with Prix entity
  @ManyToOne(() => Prix, (prix) => prix.lignesPrix, {
    onDelete: 'CASCADE', // Ensure cascade delete
  })
  prix: Prix;
}
