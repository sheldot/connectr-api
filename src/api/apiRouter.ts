import { Router } from "express";

import apiRouter from "./routes/api.routes";
import apiFieldsRouter from "./routes/apiFields.routes";

const coreRouter = () => {
  const appRouter = Router();

  appRouter.use("/api/:apiId/fields", apiFieldsRouter);
  appRouter.use("/api", apiRouter);

  return appRouter;
};

export default coreRouter;
