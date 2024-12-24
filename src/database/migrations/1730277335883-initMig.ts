import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMig1730277335883 implements MigrationInterface {
    name = 'InitMig1730277335883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`lignes_prix\` (\`idLigne\` varchar(36) NOT NULL, \`num\` int NOT NULL, \`denomVariete\` varchar(255) NOT NULL, \`codeNPA\` varchar(255) NOT NULL, \`uniteMesure\` varchar(50) NOT NULL, \`mrQuantite\` decimal(10,2) NOT NULL, \`mrPuHt\` decimal(10,2) NOT NULL, \`mrMontantHt\` decimal(10,2) NOT NULL, \`mrMontantTTC\` decimal(10,2) NOT NULL, \`deQuantite\` decimal(10,2) NOT NULL, \`deValMDA\` decimal(10,2) NOT NULL, \`deValDevise\` decimal(10,2) NOT NULL, \`trimPrecQte\` decimal(10,2) NOT NULL, \`trimPrecPUHT\` decimal(10,2) NOT NULL, \`trimPrecMontantHT\` decimal(10,2) NOT NULL, \`trimPrecMontantTTC\` decimal(10,2) NOT NULL, \`dateEntVigeur\` timestamp NOT NULL, \`obs\` text NULL, \`prixIdDoc\` varchar(36) NULL, PRIMARY KEY (\`idLigne\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` DROP FOREIGN KEY \`FK_44c01a927318f03f79b2126d6f5\``);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`num\` \`num\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`denomVariete\` \`denomVariete\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`uniteMesureKilo\` \`uniteMesureKilo\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`stockTrimestrePrec\` \`stockTrimestrePrec\` decimal NULL`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`prodTrimestreQteC2\` \`prodTrimestreQteC2\` decimal NULL`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`prodTrimestreValMDA\` \`prodTrimestreValMDA\` decimal NULL`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`venteTrimestreQteD3\` \`venteTrimestreQteD3\` decimal NULL`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`stockFinTrimestreReelQteF\` \`stockFinTrimestreReelQteF\` decimal NULL`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`stockFinTrimestreTheo\` \`stockFinTrimestreTheo\` decimal NULL`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`ecartStockReelTheo\` \`ecartStockReelTheo\` decimal NULL`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`commentEcart\` \`commentEcart\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`capProdQteG\` \`capProdQteG\` decimal NULL`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`rappelQteProductionTrimestrePrecQteh\` \`rappelQteProductionTrimestrePrecQteh\` decimal NULL`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`obs\` \`obs\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`productionIdDoc\` \`productionIdDoc\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`production\` CHANGE \`affectationGroupe\` \`affectationGroupe\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`production\` CHANGE \`affectationEPE\` \`affectationEPE\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`production\` CHANGE \`affectationFiliale\` \`affectationFiliale\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`production\` CHANGE \`trimestre\` \`trimestre\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`production\` CHANGE \`exercice\` \`exercice\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` ADD CONSTRAINT \`FK_44c01a927318f03f79b2126d6f5\` FOREIGN KEY (\`productionIdDoc\`) REFERENCES \`production\`(\`idDoc\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lignes_prix\` ADD CONSTRAINT \`FK_47726da46a8f6b7504b7dec141c\` FOREIGN KEY (\`prixIdDoc\`) REFERENCES \`prix\`(\`idDoc\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lignes_prix\` DROP FOREIGN KEY \`FK_47726da46a8f6b7504b7dec141c\``);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` DROP FOREIGN KEY \`FK_44c01a927318f03f79b2126d6f5\``);
        await queryRunner.query(`ALTER TABLE \`production\` CHANGE \`exercice\` \`exercice\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`production\` CHANGE \`trimestre\` \`trimestre\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`production\` CHANGE \`affectationFiliale\` \`affectationFiliale\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`production\` CHANGE \`affectationEPE\` \`affectationEPE\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`production\` CHANGE \`affectationGroupe\` \`affectationGroupe\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`productionIdDoc\` \`productionIdDoc\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`obs\` \`obs\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`rappelQteProductionTrimestrePrecQteh\` \`rappelQteProductionTrimestrePrecQteh\` decimal(10,0) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`capProdQteG\` \`capProdQteG\` decimal(10,0) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`commentEcart\` \`commentEcart\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`ecartStockReelTheo\` \`ecartStockReelTheo\` decimal(10,0) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`stockFinTrimestreTheo\` \`stockFinTrimestreTheo\` decimal(10,0) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`stockFinTrimestreReelQteF\` \`stockFinTrimestreReelQteF\` decimal(10,0) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`venteTrimestreQteD3\` \`venteTrimestreQteD3\` decimal(10,0) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`prodTrimestreValMDA\` \`prodTrimestreValMDA\` decimal(10,0) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`prodTrimestreQteC2\` \`prodTrimestreQteC2\` decimal(10,0) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`stockTrimestrePrec\` \`stockTrimestrePrec\` decimal(10,0) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`uniteMesureKilo\` \`uniteMesureKilo\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`denomVariete\` \`denomVariete\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` CHANGE \`num\` \`num\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lignes_production\` ADD CONSTRAINT \`FK_44c01a927318f03f79b2126d6f5\` FOREIGN KEY (\`productionIdDoc\`) REFERENCES \`production\`(\`idDoc\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`lignes_prix\``);
    }

}
