import { Request, Response } from "express";

import Endpoint from "src/db/models/Endpoint.model";
import { SUCCESS_CODE, respondSuccess } from "src/utils/responseManager.util";

import { validateUser } from "../interfaces.controllers";
import { IEndpointDTO } from "./endpoint.dto";

interface ResponseDTO {
  endpoints: IEndpointDTO[];
}

const getEndpoints = async (req: Request, res: Response) => {
  const { user_id } = await validateUser(req);

  const endpoints = (
    await Endpoint.findAll({
      where: {
        userId: user_id,
      },
    })
  ).map((a) => a.toJSON());

  const response: ResponseDTO = {
    endpoints: endpoints.map(
      ({ createdAt, deletedAt, updatedAt, id, name, userId }) => ({
        createdAt: createdAt.toISOString(),
        deletedAt: deletedAt?.toISOString(),
        updatedAt: updatedAt.toISOString(),
        id,
        name,
        userId,
      })
    ),
  };

  return respondSuccess(res, SUCCESS_CODE.OK, response);
};

export default getEndpoints;
