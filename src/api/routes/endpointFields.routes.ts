import { Router } from "express";

import getEndpointFields from "../controllers/endpoint_field/getEndpointFields";

const endpointRouter = Router();

endpointRouter.get("/:endpointId/fields", getEndpointFields);

// endpointRouter.post("/", createEndpoint);

export default endpointRouter;
