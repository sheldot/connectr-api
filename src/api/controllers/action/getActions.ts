import { Request, Response } from "express";
import Joi from "joi";

import Action from "src/db/models/Action.model";
import Endpoint from "src/db/models/Endpoint.model";
import {
  ERROR_CODE,
  SUCCESS_CODE,
  respondError,
  respondSuccess,
} from "src/utils/responseManager.util";

import { validateUser } from "../interfaces.controllers";
import { IActionDTO } from "./action.dto";
import { UuidValidation } from "src/utils/validation.util";
import { Op } from "sequelize";

// interface IRequestParamsDTO {
//   endpointId: string;
// }
// const RequestParamsDTO = Joi.object<IRequestParamsDTO, true>({
//   endpointId: UuidValidation.required(),
// });

interface ResponseDTO {
  actions: IActionDTO[];
}

const getActions = async (req: Request, res: Response) => {
  const user = await validateUser(req, res);

  // const { endpointId }: IRequestParamsDTO =
  //   await RequestParamsDTO.validateAsync(req?.params);

  // const endpoint = await Endpoint.getOneByUser(endpointId, user.id);

  // if (!endpoint) {
  //   return respondError(res, ERROR_CODE.NOT_FOUND, "Endpoint does not exist");
  // }

  const endpointIds: any[] = [];
  const endpoints = (
    await Endpoint.findAll({
      where: {
        userId: user.id,
      },
    })
  ).map((a) => {
    const endpointObj = a.toJSON();
    endpointIds.push(endpointObj.id);
    return endpointObj;
  });

  const actions = (
    await Action.findAll({
      where: {
        endpointId: { [Op.in]: endpointIds },
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
        name,
        operator,
        threshold,
        endpointId,
        fieldId,
      }) => ({
        createdAt: createdAt.toISOString(),
        deletedAt: deletedAt?.toISOString(),
        updatedAt: updatedAt.toISOString(),
        id,
        actionType,
        actionPayload,
        address,
        name,
        operator,
        threshold,
        endpointId,
        fieldId,
      })
    ),
  };

  return respondSuccess(res, SUCCESS_CODE.OK, response);
};

export default getActions;
