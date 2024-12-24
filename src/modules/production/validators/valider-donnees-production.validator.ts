// valider-donnees-production.validator.ts
import { IsNotEmpty } from 'class-validator';

export class ValiderDonneesProductionCommandValidator {
    @IsNotEmpty()
    id: string;
}
