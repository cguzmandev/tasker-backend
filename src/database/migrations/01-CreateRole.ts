import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRole1702301789294 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "ROLE",
            columns: [
               {
                  name: "ROLE_ID",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
               },
               {
                  name: "NAME",
                  type: "varchar",
                  length: "40",
                  isUnique: true,
               },
            ],
         }),
         true
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("ROLE");
   }
}
