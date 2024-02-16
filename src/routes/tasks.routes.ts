import express from "express";
import { TaskController } from "../controllers/TaskController";
import { auth } from "../middlewares/auth";

// -----------------------------------------------------------------------------

const router = express.Router();
const taskController = new TaskController();

// Get all Tasks
router.get("/", auth, taskController.getAll);
//Find one task by TASK_ID
router.get("/:id",auth, taskController.getById);
//Create new Task
router.post("/",auth, taskController.create);
//Update TASK by TASK_ID
router.patch("/",auth, taskController.update);
//Delete Task by TASK_ID
router.delete("/:id",auth, taskController.delete);

export default router;
