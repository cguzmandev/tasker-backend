import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBoards1702301789300 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "BOARD",
            columns: [
               {
                  name: "BOARD_ID",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
               },
               {
                  name: "TITLE",
                  type: "varchar",
                  length: "150",
               },
               {
                  name: "OWNER_USER_ID",
                  type: "int",
              }
            ],
            foreignKeys: [
               {
                  columnNames: ["OWNER_USER_ID"],
                  referencedTableName: "USER",
                  referencedColumnNames: ["USER_ID"],
               },
            ],
         }),
         true
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("BOARD");
   }
}
