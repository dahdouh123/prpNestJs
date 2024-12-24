import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApplicationUser } from './application-user.entity'; // Import the ApplicationUser entity
import { DenominationProduits } from '../../../denomination/entities/denomination-produits.entity';
import { VarieteProduits } from '../../../varietePrix/entities/variete-produits.entity';

@Entity('acsholding')
export class ACSHolding {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nom: string;

  @Column({ length: 100 })
  type: string;

  @Column({ length: 100, nullable: true })
  societeMere: string;

  @Column({ default: false })
  estSocieteMere: boolean;

  @Column({ nullable: true })
  logo: string;

  @OneToMany(() => ApplicationUser, applicationUser => applicationUser.affiliation)
    applicationUsers: ApplicationUser[];

    @OneToMany(() => DenominationProduits, (denominationProduits) => denominationProduits.acsHolding)
    denominationProduits: DenominationProduits[];
    @OneToMany(() => VarieteProduits, (variete_Produits) => variete_Produits.acsHolding)
    variete_Produits: VarieteProduits[];
}
