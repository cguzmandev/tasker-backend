import { faker } from "@faker-js/faker";
import { BaseFactory } from "./BaseFactory";
import { Task } from "../../models/Task";

export class TaskFactory extends BaseFactory<Task> {
   protected generateSpecifics(task: Task): Task {
      task.title = faker.lorem.lines(1);
      task.text = faker.lorem.paragraph();
      task.priority = faker.number.int(10);
      
      return task;
   }
}
