// valider-donnees-production.validator.ts
import { IsNotEmpty } from 'class-validator';

export class ValiderDonneesPrixCommandValidator {
    @IsNotEmpty()
    id: string;
}
