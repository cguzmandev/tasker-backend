import { Board } from "../../models/Board";
import { Task } from "../../models/Task";
import { User } from "../../models/User";
import { AppDataSource } from "../data-source";
import { TaskFactory } from "../factories/TaskFactory";

// -----------------------------------------------------------------------------

/**
 * Seeder tasks generation 
 */
export const taskSeeder = async () => {
   try {
      // Init database connection
      await AppDataSource.initialize();

      await seedTasksWithBoardAndUsers({count: 20});

      console.log("Seeding tasks successfully completed");
   } catch (error) {
      console.error("Error seeding the database:", error);
   } finally {
      // Database close connection
      await AppDataSource.destroy();
   }
};

export const seedTasksWithBoardAndUsers = async ({
   count,
}: {
   count: number
}) => {
   const boardRepository = AppDataSource.getRepository(Board);
   const taskRepository = AppDataSource.getRepository(Task);
   const taskFactory = new TaskFactory(taskRepository);
   const tasks = await Promise.all( taskFactory.createMany(count).map(async (task) => {
         const randomBoard = await boardRepository
            .createQueryBuilder("board")
            .select()
            .leftJoinAndSelect("board.users", "user")
            .orderBy('RAND()')
            .take(1)
            .getOne();

         if(randomBoard)
         {
            task.board = randomBoard;
            task.user = task.board.users[0]
         }
         
         return task;
      })
   );
   
   await taskRepository.save(tasks);                  
};

