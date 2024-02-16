import { faker } from "@faker-js/faker";
import { BaseFactory } from "./BaseFactory";
import { Task } from "../../models/Task";
import { Board } from "../../models/Board";

export class BoardFactory extends BaseFactory<Board> {
   protected generateSpecifics(board: Board): Board {
      board.title = faker.lorem.lines(1);
      
      return board;
   }
}
