import { ACSHolding } from '../../account/account/entities/acsholding.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('variete_Produits') // Specify the table name in the database
export class VarieteProduits {
    @PrimaryGeneratedColumn('uuid') // Use UUID as the primary key
    id: string;

    @Column() // Assuming AcsHoldingId is a foreign key
    acsHoldingId: string;

    @Column() // Denomination property
    variete: string;
    @Column() // Denomination property
    observation: string;
    @Column() // Unite property
    unite: string;

    @Column('decimal',  {default: 1}) // Coeifission de conversion de unité principal vers Tonne 
    coeifOfConv: number;
    @Column('decimal') // CapaciteProd property
    codeNPA: number;

    @ManyToOne(() => ACSHolding, (acsHolding) => acsHolding.variete_Produits, { eager: true })
    acsHolding: ACSHolding; // Relationship with the AcsHolding entity
}
