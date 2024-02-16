import express from "express";
import userRoutes from "./routes/users.routes";
import taskRoutes from "./routes/tasks.routes";
import boardRoutes from "./routes/boards.routes";
import authRoutes from "./routes/auth.routes";

// -----------------------------------------------------------------------------

const router = express.Router();

// Auth routes
router.use("/auth", authRoutes);

// User routes
router.use("/api/users", userRoutes);

// Board routes
router.use("/api/boards", boardRoutes);

// Task routes
router.use("/api/tasks", taskRoutes);

export default router;
