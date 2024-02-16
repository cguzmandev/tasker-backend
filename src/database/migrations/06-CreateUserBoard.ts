import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserBoard1702301805968 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "USER_BOARD",
            columns: [
               {
                  name: "USER_ID",
                  type: "int",
                  isPrimary: true,
               },
               {
                  name: "BOARD_ID",
                  type: "int",
                  isPrimary: true,
               },
            ],
            foreignKeys: [
               {
                  columnNames: ["USER_ID"],
                  referencedTableName: "USER",
                  referencedColumnNames: ["USER_ID"],
               },
               {
                  columnNames: ["BOARD_ID"],
                  referencedTableName: "BOARD",
                  referencedColumnNames: ["BOARD_ID"],
               },
            ],
         }),
         true
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("USER_BOARD");
   }
}
