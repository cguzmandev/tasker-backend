import { UserRoles } from "../../constants/UserRoles";
import { Role } from "../../models/Role";
import { AppDataSource } from "../data-source";

// -----------------------------------------------------------------------------

/**
 * Seeder roles generation 
 */
export const roleSeeder = async () => {
   try {
      // Init database connection
      await AppDataSource.initialize();

      const roleRepository = AppDataSource.getRepository(Role);

      // TODO: Dynamic role assignment
      const roles: Role[] = [
         UserRoles.ADMIN,
         UserRoles.USER,
      ];

      await roleRepository.save(roles);

      console.log("Seeding roles successfully completed");
   } catch (error) {
      console.error("Error seeding the database:", error);
   } finally {
      // Database close connection
      await AppDataSource.destroy();
   }
};
