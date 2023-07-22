import { Router } from "express";

import createUser from "../controllers/user/createUser";

const userRouter = Router();

userRouter.post("/", createUser);

export default userRouter;
