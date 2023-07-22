import { Request, Response } from "express";
import Joi from "joi";

import Action from "src/db/models/Action.model";
import {
  ActionTypeEnum,
  OperatorEnum,
  checkActionTypePayload,
} from "src/utils/enum.util";
import { SUCCESS_CODE, respondSuccess } from "src/utils/responseManager.util";
import {
  ActionTypeValidation,
  AddressValidation,
  OperatorValidation,
  SimpleStringValidation,
  UuidValidation,
} from "src/utils/validation.util";

import { IActionDTO } from "./action.dto";
import { validateUser } from "../interfaces.controllers";
import Endpoint from "src/db/models/Endpoint.model";

interface IRequestBodyDTO {
  actionType: ActionTypeEnum;
  actionPayload: string | null;
  address: string;
  name: string;
  operator: OperatorEnum;
  threshold: string;
}
const RequestBodyDTO = Joi.object<IRequestBodyDTO, true>({
  actionType: ActionTypeValidation.required(),
  actionPayload: SimpleStringValidation.optional(),
  address: AddressValidation.required(),
  name: SimpleStringValidation.required(),
  operator: OperatorValidation.required(),
  threshold: SimpleStringValidation.required(),
});

interface IRequestParamsDTO {
  endpointId: string;
}
const RequestParamsDTO = Joi.object<IRequestParamsDTO, true>({
  endpointId: UuidValidation.required(),
});

interface ResponseDTO {
  action: IActionDTO;
}

const createAction = async (req: Request, res: Response) => {
  const user = await validateUser(req, res);
  const { endpointId }: IRequestParamsDTO =
    await RequestParamsDTO.validateAsync(req?.params);

  const {
    actionType,
    actionPayload,
    address,
    name,
    operator,
    threshold,
  }: IRequestBodyDTO = await RequestBodyDTO.validateAsync(req?.body);

  const endpoint = await Endpoint.getOneByUser(endpointId, user.id);

  if (!endpoint) {
    throw new Error("Endpoint does not exist");
  }

  // Check that the action payload is valid for this action type
  console.log("\n-=-=- actionPayload");
  console.log(actionPayload);

  try {
    JSON.parse(actionPayload || "{}");
  } catch (e) {
    throw new Error("Action payload is not valid JSON");
  }

  const parsedActionPayload = JSON.parse(actionPayload || "{}");
  console.log("\n-=-=- parsedActionPayload");
  console.log(parsedActionPayload);
  console.log(
    "\n-=-=- checkActionTypePayload[actionType](parsedActionPayload)"
  );
  console.log(checkActionTypePayload[actionType](parsedActionPayload));

  if (!checkActionTypePayload[actionType](parsedActionPayload)) {
    throw new Error("Action payload does not match action type");
  }

  const createdAction = await Action.validateAndCreate({
    actionType,
    actionPayload,
    address,
    name,
    operator,
    threshold,
    endpointId,
  });

  const response: ResponseDTO = {
    action: {
      createdAt: createdAction.createdAt.toISOString(),
      deletedAt: createdAction.deletedAt?.toISOString(),
      updatedAt: createdAction.updatedAt.toISOString(),

      id: createdAction.id,

      actionType: createdAction.actionType,
      actionPayload: createdAction.actionPayload,
      address: createdAction.address,
      name: createdAction.name,
      operator: createdAction.operator,
      threshold: createdAction.threshold,

      endpointId: createdAction.endpointId,
    },
  };

  return respondSuccess(res, SUCCESS_CODE.OK, response);
};

export default createAction;
