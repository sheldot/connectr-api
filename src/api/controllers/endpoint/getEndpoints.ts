import { Request, Response } from "express";

import Endpoint from "src/db/models/Endpoint.model";

import { IEndpointDTO } from "./endpoint.dto";

interface ResponseDTO {
  endpoints: IEndpointDTO[];
}

const getEndpoints = async (req: Request, res: Response) => {
  const { userId } = req.headers;

  const endpoints = (
    await Endpoint.findAll({
      where: {
        // userId: userId,
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
  res.status(200).send(response);
};

export default getEndpoints;
