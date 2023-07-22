import { Router } from "express";

import createAction from "../controllers/action/createAction";
import getActions from "../controllers/action/getActions";

const actionRouter = Router();

actionRouter.get("/:endpointId/actions", getActions);

actionRouter.post("/:endpointId/actions", createAction);

export default actionRouter;
