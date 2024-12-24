import { EntityRepository, Repository } from 'typeorm';
import { DenominationProduits } from '../entities/denomination-produits.entity';

@EntityRepository(DenominationProduits)
export class DenominationProduitsRepository extends Repository<DenominationProduits> {}