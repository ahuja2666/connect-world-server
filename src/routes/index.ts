import { Router } from "express";
import userRouter from "./user.routes";

export const mainRouter = Router();

// Bundle all your sub-routers here
mainRouter.use("/users", userRouter);
