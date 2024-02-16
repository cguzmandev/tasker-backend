import express, { Application } from "express";
import router from "./router";

// -----------------------------------------------------------------------------

const app: Application = express();

// Middlewares
app.use(express.json());

app.use(router)


export default app;
