import { Request, Response } from "express";
import Joi from "joi";

import Action from "src/db/models/Action.model";
import {
  ERROR_CODE,
  SUCCESS_CODE,
  respondError,
  respondSuccess,
} from "src/utils/responseManager.util";

import { validateUser } from "../interfaces.controllers";
import { IActionDTO } from "./action.dto";
import { UuidValidation } from "src/utils/validation.util";
import Endpoint from "src/db/models/Endpoint.model";

interface IRequestParamsDTO {
  endpointId: string;
}
const RequestParamsDTO = Joi.object<IRequestParamsDTO, true>({
  endpointId: UuidValidation.required(),
});

interface ResponseDTO {
  actions: IActionDTO[];
}

const getActions = async (req: Request, res: Response) => {
  const user = await validateUser(req, res);

  const { endpointId }: IRequestParamsDTO =
    await RequestParamsDTO.validateAsync(req?.params);

  const endpoint = await Endpoint.getOneByUser(endpointId, user.id);

  if (!endpoint) {
    return respondError(res, ERROR_CODE.NOT_FOUND, "Endpoint does not exist");
  }

  const actions = (
    await Action.findAll({
      where: {
        endpointId: endpoint.id,
      },
    })
  ).map((a) => a.toJSON());

  const response: ResponseDTO = {
    actions: actions.map(
      ({
        createdAt,
        deletedAt,
        updatedAt,
        id,
        actionType,
        actionPayload,
        address,
        operator,
        threshold,
        endpointId,
      }) => ({
        createdAt: createdAt.toISOString(),
        deletedAt: deletedAt?.toISOString(),
        updatedAt: updatedAt.toISOString(),
        id,
        actionType,
        actionPayload,
        address,
        operator,
        threshold,
        endpointId,
      })
    ),
  };

  return respondSuccess(res, SUCCESS_CODE.OK, response);
};

export default getActions;
