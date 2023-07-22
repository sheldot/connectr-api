import { Request, Response } from "express";
import Joi from "joi";

import Endpoint from "src/db/models/Endpoint.model";
import EndpointField from "src/db/models/EndpointField.model";
import User from "src/db/models/User.model";
import {
  DexFieldEnum,
  DexProductEnum,
  LendingFieldEnum,
  LendingProductEnum,
  MiscFieldEnum,
  MiscProductEnum,
  TokenFieldEnum,
  TokenProductEnum,
} from "src/utils/enum.util";
import {
  ERROR_CODE,
  SUCCESS_CODE,
  respondError,
  respondSuccess,
} from "src/utils/responseManager.util";
import {
  FieldValidation,
  ProductValidation,
  SimpleStringValidation,
} from "src/utils/validation.util";

import { IEndpointWithFieldsDTO } from "./endpoint.dto";
import { validateUser } from "../interfaces.controllers";

interface IApiFieldSet {
  fieldNameEnum:
    | DexFieldEnum
    | LendingFieldEnum
    | MiscFieldEnum
    | TokenFieldEnum;
  productNameEnum:
    | DexProductEnum
    | LendingProductEnum
    | MiscProductEnum
    | TokenProductEnum;
}
const ApiFieldSetDTO = Joi.object<IApiFieldSet, true>({
  fieldNameEnum: FieldValidation.required(),
  productNameEnum: ProductValidation.required(),
} as any);

interface IRequestBodyDTO {
  name: string;
  fieldsToCreate: IApiFieldSet[];
}
const RequestBodyDTO = Joi.object<IRequestBodyDTO, true>({
  name: SimpleStringValidation.required(),
  fieldsToCreate: Joi.array().items(ApiFieldSetDTO).required(),
});

interface ResponseDTO {
  endpoint: IEndpointWithFieldsDTO;
}

const createEndpoint = async (req: Request, res: Response) => {
  const { user_id } = await validateUser(req);

  const user = await User.getOneByAddress(user_id);

  if (!user) {
    return respondError(res, ERROR_CODE.NOT_FOUND, "User does not exist");
  }

  const { name: endpointName, fieldsToCreate }: IRequestBodyDTO =
    await RequestBodyDTO.validateAsync(req?.body);

  const createdEndpoint = await Endpoint.validateAndCreate({
    name: endpointName,
    userId: user.id,
  });

  const createdEndpointFields = await Promise.all(
    fieldsToCreate.map(({ fieldNameEnum, productNameEnum }) =>
      EndpointField.validateAndCreateByFieldName({
        endpointId: createdEndpoint.id,
        fieldName: fieldNameEnum,
        productName: productNameEnum,
      })
    )
  );

  const response: ResponseDTO = {
    endpoint: {
      createdAt: createdEndpoint.createdAt.toISOString(),
      deletedAt: createdEndpoint.deletedAt?.toISOString(),
      updatedAt: createdEndpoint.updatedAt.toISOString(),

      id: createdEndpoint.id,
      name: createdEndpoint.name,
      userId: createdEndpoint.userId,

      fields: createdEndpointFields.map(
        ({ createdAt, deletedAt, updatedAt, id, endpointId, fieldId }) => ({
          createdAt: createdAt.toISOString(),
          deletedAt: deletedAt?.toISOString(),
          updatedAt: updatedAt.toISOString(),
          id,
          endpointId,
          fieldId,
        })
      ),
    },
  };

  return respondSuccess(res, SUCCESS_CODE.OK, response);
};

export default createEndpoint;
