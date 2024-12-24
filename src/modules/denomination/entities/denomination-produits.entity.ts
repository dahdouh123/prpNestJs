import { ACSHolding } from '../../../modules/account/account/entities/acsholding.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('denomination_produits') // Specify the table name in the database
export class DenominationProduits {
    @PrimaryGeneratedColumn('uuid') // Use UUID as the primary key
    id: string;

    @Column() // Assuming AcsHoldingId is a foreign key
    acsHoldingId: string;

    @Column() // Denomination property
    denomination: string;

    @Column() // Unite property
    unite: string;

    @Column('decimal', { precision: 10, scale: 3, default: 1 }) // Coefficient de conversion
    coeifOfConv: number;

    @Column('decimal') // CapaciteProd property
    capaciteProd: number;
    @Column('decimal') // CapaciteProd property
    stockInitial: number;

    @ManyToOne(() => ACSHolding, (acsHolding) => acsHolding.denominationProduits, { eager: true })
    acsHolding: ACSHolding; // Relationship with the AcsHolding entity
}
