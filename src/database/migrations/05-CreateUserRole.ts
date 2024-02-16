import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserRole1702301805968 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "USER_ROLE",
            columns: [
               {
                  name: "USER_ID",
                  type: "int",
                  isPrimary: true,
               },
               {
                  name: "ROLE_ID",
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
                  columnNames: ["ROLE_ID"],
                  referencedTableName: "ROLE",
                  referencedColumnNames: ["ROLE_ID"],
               },
            ],
         }),
         true
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("USER_ROLE");
   }
}
