import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { TaskStatus } from "../../constants/TaskStatus";

export class CreateTasks1702301796616 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "TASK",
            columns: [
               {
                  name: "TASK_ID",
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
                  name: "TEXT",
                  type: "varchar",
                  length: "300",
               },
               {
                  name: "PRIORITY",
                  type: "int",
               },
               {
                  name: 'STATUS',
                  type: 'enum',
                  enum: Object.values(TaskStatus),
                  default: "'" + TaskStatus.TODO + "'", 
              },
              {
                  name: "USER_ID",
                  type: "int",
              },
              {
                  name: "BOARD_ID",
                  type: "int",
              },
              {
               name: "created_at",
               type: "timestamp",
               default: "CURRENT_TIMESTAMP",
            },
            {
               name: "updated_at",
               type: "timestamp",
               default: "CURRENT_TIMESTAMP",
            },
            {
               name: "deleted_at",
               type: "timestamp",
               isNullable: true,
            },
            ],
            foreignKeys: [
               {
                  columnNames: ["BOARD_ID"],
                  referencedTableName: "BOARD",
                  referencedColumnNames: ["BOARD_ID"],
               },
               {
                  columnNames: ["USER_ID"],
                  referencedTableName: "USER",
                  referencedColumnNames: ["USER_ID"],
               },
            ],
         }),
         true
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("TASK");
   }
}
