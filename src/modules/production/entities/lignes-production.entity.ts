import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Production } from './production.entity';

@Entity('lignes_production')
export class LignesProduction {
  @PrimaryGeneratedColumn('uuid')
  idLigne: string;

  @Column({ nullable: true })
  num: number;

  @Column({ nullable: true })
  denomVariete: string;

  @Column({ nullable: true })
  uniteMesureKilo: string;

  @Column({ type: 'decimal', nullable: true })
  stockTrimestrePrec: number;
  @Column({ type: 'decimal', nullable: true })
  stockTrimestrePrecT: number;

  @Column({ type: 'decimal', nullable: true })
  prodTrimestreQteC2: number;
  @Column({ type: 'decimal', nullable: true })
  prodTrimestreQteC2T: number;

  @Column({ type: 'decimal', nullable: true })
  prodTrimestreValMDA: number;

  @Column({ type: 'decimal', nullable: true })
  venteTrimestreQteD3: number;
  @Column({ type: 'decimal', nullable: true })
  venteTrimestreQteD3T: number;


  @Column({ type: 'decimal', nullable: true })
  stockFinTrimestreReelQteF: number;
  @Column({ type: 'decimal', nullable: true })
  stockFinTrimestreReelQteFT: number;

  @Column({ type: 'decimal', nullable: true })
  stockFinTrimestreTheo: number;
  @Column({ type: 'decimal', nullable: true })
  stockFinTrimestreTheoT: number;

  @Column({ type: 'decimal', nullable: true })
  ecartStockReelTheo: number;
  @Column({ type: 'decimal', nullable: true })
  ecartStockReelTheoT: number;

  @Column({ nullable: true })
  commentEcart: string;

  @Column({ type: 'decimal', nullable: true })
  capProdQteG: number;
  @Column({ type: 'decimal', nullable: true })
  capProdQteGT: number;

  @Column({ type: 'decimal', nullable: true })
  rappelQteProductionTrimestrePrecQteh: number;
  @Column({ type: 'decimal', nullable: true })
  rappelQteProductionTrimestrePrecQtehT: number;
  
  @Column({ nullable: true })
  obs: string;

  @ManyToOne(() => Production, (production) => production.lignesProduction, {
    onDelete: 'CASCADE', // Ensure cascade delete
  })
  production: Production;
}
