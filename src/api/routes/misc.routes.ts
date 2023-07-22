import { Router } from "express";

import setup from "../controllers/misc/setup";

const setupRouter = Router();

setupRouter.post("/setup", setup);

export default setupRouter;
