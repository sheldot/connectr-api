import { Request, Response } from "express";
import Joi from "joi";

import Action from "src/db/models/Action.model";
import Endpoint from "src/db/models/Endpoint.model";
import Field from "src/db/models/Field.model";
import {
  ActionTypeEnum,
  DexFieldEnum,
  DexProductEnum,
  LendingFieldEnum,
  LendingProductEnum,
  MiscFieldEnum,
  MiscProductEnum,
  OperatorEnum,
  TokenFieldEnum,
  TokenProductEnum,
  checkActionTypePayload,
} from "src/utils/enum.util";
import { SUCCESS_CODE, respondSuccess } from "src/utils/responseManager.util";
import {
  ActionTypeValidation,
  AddressValidation,
  FieldValidation,
  OperatorValidation,
  ProductValidation,
  SimpleStringValidation,
  UuidValidation,
} from "src/utils/validation.util";

import { IActionDTO } from "./action.dto";
import { validateUser } from "../interfaces.controllers";
import EndpointField from "src/db/models/EndpointField.model";

interface IRequestBodyDTO {
  actionType: ActionTypeEnum;
  actionPayload: string | null;
  address: string;
  name: string;
  operator: OperatorEnum;
  threshold: string;
  fieldId: string;
}
const RequestBodyDTO = Joi.object<IRequestBodyDTO, true>({
  actionType: ActionTypeValidation.required(),
  actionPayload: SimpleStringValidation.optional(),
  address: AddressValidation.required(),
  name: SimpleStringValidation.required(),
  operator: OperatorValidation.required(),
  threshold: SimpleStringValidation.required(),
  fieldId: UuidValidation.required(),
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
    fieldId,
  }: IRequestBodyDTO = await RequestBodyDTO.validateAsync(req?.body);

  const endpoint = await Endpoint.getOneByUser(endpointId, user.id);

  if (!endpoint) {
    throw new Error("Endpoint does not exist");
  }

  const endpointFieldObj = await EndpointField.getOneById(fieldId);

  if (!endpointFieldObj) {
    throw new Error("Field not found");
  }

  const fieldObj = await Field.getOneById(endpointFieldObj.fieldId);

  if (!fieldObj) {
    throw new Error("Field not found");
  }

  // Check that the action payload is valid for this action type
  try {
    JSON.parse(actionPayload || "{}");
  } catch (e) {
    throw new Error("Action payload is not valid JSON");
  }

  const parsedActionPayload = JSON.parse(actionPayload || "{}");

  if (!checkActionTypePayload[actionType](parsedActionPayload)) {
    throw new Error("Action payload does not match action type");
  }

  const createdAction = await Action.validateAndCreate({
    fieldId: fieldObj.id,
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
      fieldId: createdAction.fieldId,
    },
  };

  return respondSuccess(res, SUCCESS_CODE.OK, response);
};

export default createAction;
