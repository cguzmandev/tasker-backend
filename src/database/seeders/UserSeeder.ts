import { AppDataSource } from "../data-source";
import { User } from "../../models/User";
import { UserFactory } from "../factories/UserFactory";
import { Role } from "../../models/Role";
import { Task } from "../../models/Task";
import { UserRoles } from "../../constants/UserRoles";

// -----------------------------------------------------------------------------

/**
 * Seeder para la generación de usuarios y su almacenamiento en la base de datos.
 */
export const userSeeder = async () => {
   try {
      await AppDataSource.initialize();

      const roleRepository = AppDataSource.getRepository(Role);
      const rolesList = await roleRepository.find();

      // Default number of users by role
      const count = 3;
      await Promise.all(rolesList.map(async (role) => {
           
         await seedUsersWithRoles({
               roles: [role],
               count: count,
         });

      }));
      
      console.log("Seeding users successfully completed");
   } catch (error) {
      console.error("Error seeding the database:", error);
   } finally {
      await AppDataSource.destroy();
   }
};

export const seedUsersWithRoles = async ({
   roles,
   count,
}: {
   roles: Role[];
   count: number; 
}) => {
   const userRepository = AppDataSource.getRepository(User);
   const userFactory = new UserFactory(userRepository);
   const users = userFactory.createMany(count);

   //Assign roles to users
   users.forEach((user) => {
      user.roles = roles;
   });

   await userRepository.save(users);     
   
   return users;
};