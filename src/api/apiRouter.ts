import { Router } from "express";

import actionRouter from "./routes/action.routes";
import endpointRouter from "./routes/endpoint.routes";
import endpointFieldsRouter from "./routes/endpointFields.routes";
import userRouter from "./routes/user.routes";

import miscRouter from "./routes/misc.routes";

const ping = async (_: any, res: any) => {
  res.status(200).send("pong");
};

const coreRouter = () => {
  const appRouter = Router();

  appRouter.get("/ping", ping);
  appRouter.use("/misc", miscRouter);

  appRouter.use("/endpoint", actionRouter);
  appRouter.use("/endpoint", endpointFieldsRouter);
  appRouter.use("/endpoint", endpointRouter);
  appRouter.use("/user", userRouter);

  return appRouter;
};

export default coreRouter;
