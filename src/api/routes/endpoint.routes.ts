import { Router } from "express";

import getEndpoints from "../controllers/endpoint/getEndpoints";

const endpointRouter = Router();

endpointRouter.get("/", getEndpoints);

// endpointRouter.post("/", createEndpoint);

export default endpointRouter;
