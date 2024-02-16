import express from "express";
import { BoardController } from "../controllers/BoardController";
import { auth } from "../middlewares/auth";

// -----------------------------------------------------------------------------

const router = express.Router();
const boardController = new BoardController();

// Get all Boards
router.get("/", auth, boardController.getAll);
//Find one board by TASK_ID
router.get("/:id",auth, boardController.getById);
//Create new Board
router.post("/",auth, boardController.create);
//Update Board by TASK_ID
router.patch("/",auth, boardController.update);
//Delete Board by TASK_ID
router.delete("/:id",auth, boardController.delete);

export default router;
