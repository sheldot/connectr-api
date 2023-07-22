import { Router } from "express";

import createUser from "../controllers/user/createUser";
import getUser from "../controllers/user/getUser";

const userRouter = Router();

userRouter.get("/:userAddress", getUser);
userRouter.post("/", createUser);

export default userRouter;
