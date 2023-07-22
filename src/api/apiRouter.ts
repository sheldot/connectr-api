import { Router } from "express";

import apiRouter from "./routes/api.routes";
import apiFieldsRouter from "./routes/apiFields.routes";

const ping = async (_: any, res: any) => {
  res.status(200).send("pong");
};

const coreRouter = () => {
  const appRouter = Router();

  appRouter.get("/ping", ping);

  appRouter.use("/api/:apiId/fields", apiFieldsRouter);
  appRouter.use("/api", apiRouter);

  return appRouter;
};

export default coreRouter;
