import { Router } from "express";

import getApis from "../controllers/api/getApis";

const apiRouter = Router();

const ping = async (_: any, res: any) => {
  res.status(200).send("pong");
};

apiRouter.get("/ping", ping);
apiRouter.get("/", getApis);

// apiRouter.post("/", createApi);

export default apiRouter;
