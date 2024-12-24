import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigIdent21734340585164 implements MigrationInterface {
    name = 'InitMigIdent21734340585164'

    public async up(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.query(`ALTER TABLE \`denomination_produits\` CHANGE \`coeifOfConv\` \`coeifOfConv\` decimal(10,3) NOT NULL DEFAULT '1.000'`);
       
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      
        await queryRunner.query(`ALTER TABLE \`denomination_produits\` CHANGE \`coeifOfConv\` \`coeifOfConv\` decimal(10,0) NOT NULL DEFAULT '1'`);
       
    }

}
