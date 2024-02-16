import { taskSeeder } from "./TaskSeeder";
import { roleSeeder } from "./RoleSeeder";
import { userSeeder } from "./UserSeeder";
import { boardSeeder } from "./BoardSeeder";


(async () => {
   console.log("-----------------------------------------------");
   console.log("Starting seeders...");
   console.log("-----------------------------------------------");

   await roleSeeder(); 
   await userSeeder(); 
   await boardSeeder(); 
   await taskSeeder(); 

   console.log("-----------------------------------------------");
})();
