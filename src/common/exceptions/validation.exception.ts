// validation.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
    constructor(private readonly validationErrors: any[]) {
        super('Validation failed', HttpStatus.BAD_REQUEST);
    }

    getErrors() {
        return this.validationErrors;
    }
}
