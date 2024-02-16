import "reflect-metadata";
import { DataSource } from "typeorm";

// -----------------------------------------------------------------------------

export const AppDataSource = new DataSource({
   type: "mysql",
   host: "localhost",
   port: 33060,
   username: "root",
   password: "toor",
   database: "TASKER",
   entities: [`${__dirname}/../models/**/*{.js,.ts}`],
   migrations: [`${__dirname}/migrations/**/*{.js,.ts}`],
   // migrations: [
   //    CreateRoles1702301789294,
   //    CreateUsers1702301796616,
   //    CreateUsersRoles1702301805968,
   // ],
   synchronize: false,
   logging: false,
});

// console.log(`${__dirname}/migrations`);
