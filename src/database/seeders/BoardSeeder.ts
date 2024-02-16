import { UserRoles } from "../../constants/UserRoles";
import { Board } from "../../models/Board";
import { Role } from "../../models/Role";
import { User } from "../../models/User";
import { AppDataSource } from "../data-source";
import { BoardFactory } from "../factories/BoardFactory";

// -----------------------------------------------------------------------------

/**
 * Seeder roles generation 
 */
export const boardSeeder = async () => {
   try {
      // Init database connection
      await AppDataSource.initialize();

      await seedBoardsWithUsers({count: 10});

      console.log("Seeding boards successfully completed");
   } catch (error) {
      console.error("Error seeding the database:", error);
   } finally {
      // Database close connection
      await AppDataSource.destroy();
   }
};

export const seedBoardsWithUsers = async ({
   count,
}: {
   count: number
}) => {
   const userRepository = AppDataSource.getRepository(User);
   const boardRepository = AppDataSource.getRepository(Board);
   const boardFactory = new BoardFactory(boardRepository);
   const boards = await Promise.all( boardFactory.createMany(count).map(async (board) => {
         const randomUsers = await userRepository
            .createQueryBuilder()
            .select()
            .orderBy('RAND()')
            .take(3)
            .getMany();

         board.owner = randomUsers[0];
         board.users = randomUsers;

         return board;
      })
   );
   
   await boardRepository.save(boards);                  
};
