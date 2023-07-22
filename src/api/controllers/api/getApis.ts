import { Request, Response } from "express";

import Api from "src/db/models/Api.model";

import { IApiDTO } from "./api.dto";

interface ResponseDTO {
  apis: IApiDTO[];
}

const getApis = async (req: Request, res: Response) => {
  const { userId } = req.headers;

  const apis = (
    await Api.findAll({
      where: {
        // userId: userId,
      },
    })
  ).map((a) => a.toJSON());

  const response: ResponseDTO = {
    apis: apis.map(({ createdAt, deletedAt, updatedAt, id, userId }) => ({
      createdAt: createdAt.toISOString(),
      deletedAt: deletedAt?.toISOString(),
      updatedAt: updatedAt.toISOString(),
      id,
      userId,
    })),
  };
  res.status(200).send(response);
};

export default getApis;
