import { Router } from "express";
import {
    createUser,
    getUserByEmail,
    getUserById,
    updateOrCreateUser,
} from "./user.controller.js";

const userRouter = Router();

userRouter.post("/signup", createUser);
userRouter.put("/:id", updateOrCreateUser);
userRouter.get("/by-email", getUserByEmail);
userRouter.get("/:id", getUserById);

export { userRouter };
