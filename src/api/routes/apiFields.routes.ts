import { Router } from "express";

import getApis from "../controllers/api/getApis";

const apiRouter = Router();

apiRouter.get("/", getApis);

// apiRouter.post("/", createApi);

export default apiRouter;
