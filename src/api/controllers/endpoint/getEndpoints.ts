import { Request, Response } from "express";

import Endpoint from "src/db/models/Endpoint.model";

import { IEndpointDTO } from "./endpoint.dto";
import { SUCCESS_CODE, respondSuccess } from "src/utils/responseManager.util";
import { AddressValidation } from "src/utils/validation.util";

interface IRequestHeaderDTO {
  userId: string;
}
const RequestBodyDTO = Joi.object<IRequestHeaderDTO, true>({
  userId: AddressValidation.required(),
});

interface ResponseDTO {
  endpoints: IEndpointDTO[];
}

const getEndpoints = async (req: Request, res: Response) => {
  const { userId }: IRequestHeaderDTO = await RequestBodyDTO.validateAsync(
    req?.headers
  );

  const endpoints = (
    await Endpoint.findAll({
      where: {
        userId,
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
