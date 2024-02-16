import express from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middlewares/auth";

// -----------------------------------------------------------------------------

const router = express.Router();
const userController = new UserController();

// Get all Users
router.get("/", auth, userController.getAll);
//Find one user by USER_ID
router.get("/:id",auth, userController.getById);
//Create new User
router.post("/",auth, userController.create);
//Update USER by USER_ID
router.patch("/",auth, userController.update);
//Delete User by USER_ID
router.delete("/:id",auth, userController.delete);

export default router;
