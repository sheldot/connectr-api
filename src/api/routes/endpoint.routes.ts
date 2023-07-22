import { Router } from "express";

import createEndpoint from "../controllers/endpoint/createEndpoint";
import getEndpoints from "../controllers/endpoint/getEndpoints";

const endpointRouter = Router();

endpointRouter.get("/", getEndpoints);

endpointRouter.post("/", createEndpoint);

export default endpointRouter;
