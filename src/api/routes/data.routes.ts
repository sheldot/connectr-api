import { Router } from "express";

import getData from "../controllers/data/getData";

const dataRouter = Router();

dataRouter.get("/endpoints/:endpointId/data", getData);

export default dataRouter;
