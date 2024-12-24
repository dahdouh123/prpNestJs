import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigIdent1734252534766 implements MigrationInterface {
    name = 'InitMigIdent1734252534766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`application_role\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_2b4bcd1fc4648add13f59cd92a\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`application_user_role\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(36) NULL, \`applicationRoleId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`denomination_produits\` (\`id\` varchar(36) NOT NULL, \`acsHoldingId\` varchar(255) NOT NULL, \`denomination\` varchar(255) NOT NULL, \`unite\` varchar(255) NOT NULL, \`coeifOfConv\` decimal NOT NULL DEFAULT '1', \`capaciteProd\` decimal NOT NULL, \`stockInitial\` decimal NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`variete_Produits\` (\`id\` varchar(36) NOT NULL, \`acsHoldingId\` varchar(255) NOT NULL, \`variete\` varchar(255) NOT NULL, \`observation\` varchar(255) NOT NULL, \`unite\` varchar(255) NOT NULL, \`coeifOfConv\` decimal NOT NULL DEFAULT '1', \`codeNPA\` decimal NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`acsholding\` (\`id\` varchar(36) NOT NULL, \`nom\` varchar(100) NOT NULL, \`type\` varchar(100) NOT NULL, \`societeMere\` varchar(100) NULL, \`estSocieteMere\` tinyint NOT NULL DEFAULT 0, \`logo\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`application_user\` (\`id\` varchar(36) NOT NULL, \`userName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`fullName\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`passwordHash\` varchar(255) NOT NULL, \`isShowPhoneNumberInOdoo\` tinyint NULL, \`ACSHoldingId\` varchar(255) NULL, UNIQUE INDEX \`IDX_8533cedc452c829104f8d868c2\` (\`userName\`), UNIQUE INDEX \`IDX_47745627359dd6ef1c7cd5f8b1\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`societe\` (\`id\` int NOT NULL AUTO_INCREMENT, \`acsHoldingId\` varchar(255) NOT NULL, \`entreprise\` varchar(255) NOT NULL, \`nis\` varchar(255) NOT NULL, \`naaDivision\` varchar(255) NOT NULL, \`naaGroup\` varchar(255) NOT NULL, \`groupe\` varchar(255) NOT NULL, \`adresse\` varchar(255) NOT NULL, \`wilaya\` varchar(255) NOT NULL, \`codePostal\` varchar(255) NOT NULL, \`telephone\` varchar(255) NOT NULL, \`fax\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`siteWeb\` varchar(255) NULL, \`activitePrincipale\` varchar(255) NOT NULL, \`activiteSecondaire\` varchar(255) NULL, \`effectifTotal\` int NOT NULL, \`effectifPermanents\` int NOT NULL, \`nombreUnites\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`application_user_role\` ADD CONSTRAINT \`FK_34ae70c064f705cb43a485fca8e\` FOREIGN KEY (\`userId\`) REFERENCES \`application_user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`application_user_role\` ADD CONSTRAINT \`FK_ee8f20f500fb4f33c845a89e17d\` FOREIGN KEY (\`applicationRoleId\`) REFERENCES \`application_role\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`denomination_produits\` ADD CONSTRAINT \`FK_dca60eb79abd355e158d0180907\` FOREIGN KEY (\`acsHoldingId\`) REFERENCES \`acsholding\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`variete_Produits\` ADD CONSTRAINT \`FK_c2d4f96704869f970dca8783995\` FOREIGN KEY (\`acsHoldingId\`) REFERENCES \`acsholding\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`application_user\` ADD CONSTRAINT \`FK_285f0096b86dd639a08068ce0d8\` FOREIGN KEY (\`ACSHoldingId\`) REFERENCES \`acsholding\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`application_user\` DROP FOREIGN KEY \`FK_285f0096b86dd639a08068ce0d8\``);
        await queryRunner.query(`ALTER TABLE \`variete_Produits\` DROP FOREIGN KEY \`FK_c2d4f96704869f970dca8783995\``);
        await queryRunner.query(`ALTER TABLE \`denomination_produits\` DROP FOREIGN KEY \`FK_dca60eb79abd355e158d0180907\``);
        await queryRunner.query(`ALTER TABLE \`application_user_role\` DROP FOREIGN KEY \`FK_ee8f20f500fb4f33c845a89e17d\``);
        await queryRunner.query(`ALTER TABLE \`application_user_role\` DROP FOREIGN KEY \`FK_34ae70c064f705cb43a485fca8e\``);
        await queryRunner.query(`DROP TABLE \`societe\``);
        await queryRunner.query(`DROP INDEX \`IDX_47745627359dd6ef1c7cd5f8b1\` ON \`application_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_8533cedc452c829104f8d868c2\` ON \`application_user\``);
        await queryRunner.query(`DROP TABLE \`application_user\``);
        await queryRunner.query(`DROP TABLE \`acsholding\``);
        await queryRunner.query(`DROP TABLE \`variete_Produits\``);
        await queryRunner.query(`DROP TABLE \`denomination_produits\``);
        await queryRunner.query(`DROP TABLE \`application_user_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_2b4bcd1fc4648add13f59cd92a\` ON \`application_role\``);
        await queryRunner.query(`DROP TABLE \`application_role\``);
    }

}
