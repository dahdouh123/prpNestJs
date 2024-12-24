import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateLignProd1734349194766 implements MigrationInterface {
    name = 'UpdateLignProd1734349194766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lignes_production\` ADD \`stockTrimestrePrecT\` decimal NULL`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` ADD \`prodTrimestreQteC2T\` decimal NULL`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` ADD \`venteTrimestreQteD3T\` decimal NULL`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` ADD \`stockFinTrimestreReelQteFT\` decimal NULL`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` ADD \`stockFinTrimestreTheoT\` decimal NULL`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` ADD \`ecartStockReelTheoT\` decimal NULL`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` ADD \`capProdQteGT\` decimal NULL`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` ADD \`rappelQteProductionTrimestrePrecQtehT\` decimal NULL`);
       
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       
        await queryRunner.query(`ALTER TABLE \`lignes_production\` DROP COLUMN \`rappelQteProductionTrimestrePrecQtehT\``);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` DROP COLUMN \`capProdQteGT\``);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` DROP COLUMN \`ecartStockReelTheoT\``);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` DROP COLUMN \`stockFinTrimestreTheoT\``);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` DROP COLUMN \`stockFinTrimestreReelQteFT\``);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` DROP COLUMN \`venteTrimestreQteD3T\``);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` DROP COLUMN \`prodTrimestreQteC2T\``);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` DROP COLUMN \`stockTrimestrePrecT\``);
    }

}
