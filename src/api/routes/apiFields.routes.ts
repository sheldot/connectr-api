import { Router } from "express";

import getApiFields from "../controllers/api_field/getApiFields";

const apiRouter = Router();

apiRouter.get("/:apiId/fields", getApiFields);

// apiRouter.post("/", createApi);

export default apiRouter;
