import { Router } from "express";

import createAction from "../controllers/action/createAction";
import getActions from "../controllers/action/getActions";

const actionRouter = Router();

actionRouter.get("/actions", getActions);

actionRouter.post("/endpoints/:endpointId/actions", createAction);

export default actionRouter;
