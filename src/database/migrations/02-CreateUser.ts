import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1702301789299 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "USER",
            columns: [
               {
                  name: "USER_ID",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
               },
               {
                  name: "USERNAME",
                  type: "varchar",
                  length: "40",
                  isUnique: true,
               },
               {
                  name: "PASSWORD_HASH",
                  type: "varchar",
                  length: "255",
               },
               {
                  name: "EMAIL",
                  type: "varchar",
                  length: "255",
                  isUnique: true,
               },
            ],
         }),
         true
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("USER");
   }
}
