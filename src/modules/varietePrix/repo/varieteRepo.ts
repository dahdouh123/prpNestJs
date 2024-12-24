import { EntityRepository, Repository } from 'typeorm';
import { VarieteProduits } from '../entities/variete-produits.entity';

@EntityRepository(VarieteProduits)
export class VarieteProduitsRepository extends Repository<VarieteProduits> {}