import { Request, Response } from "express";
import Joi from "joi";

import Endpoint from "src/db/models/Endpoint.model";
import EndpointField from "src/db/models/EndpointField.model";
import { OperatorEnum } from "src/utils/enum.util";
import { SUCCESS_CODE, respondSuccess } from "src/utils/responseManager.util";
import {
  AddressValidation,
  OperatorValidation,
  SimpleStringValidation,
} from "src/utils/validation.util";

import { IEndpointDTO } from "./endpoint.dto";

interface IRequestHeaderDTO {
  userId: string;
}
const RequestHeaderDTO = Joi.object<IRequestHeaderDTO, true>({
  userId: AddressValidation.required(),
});

export interface IFieldToCreateDTO {
  operator: OperatorEnum;
  fieldId: string;
  value: string;
}
const FieldToCreateDTO = Joi.object<IFieldToCreateDTO, true>({
  operator: OperatorValidation.required(),
  fieldId: SimpleStringValidation.required(),
  value: SimpleStringValidation.required(),
});

interface IRequestBodyDTO {
  name: string;
  fieldsToCreate: IFieldToCreateDTO[];
}
const RequestBodyDTO = Joi.object<IRequestBodyDTO, true>({
  name: SimpleStringValidation.required(),
  fieldsToCreate: Joi.array().items(FieldToCreateDTO).required(),
});

interface ResponseDTO {
  endpoint: IEndpointDTO;
}

const createEndpoint = async (req: Request, res: Response) => {
  const { userId }: IRequestHeaderDTO = await RequestHeaderDTO.validateAsync(
    req?.headers
  );

  const { name: endpointName, fieldsToCreate }: IRequestBodyDTO =
    await RequestBodyDTO.validateAsync(req?.body);

  const createdEndpoint = await Endpoint.validateAndCreate({
    userId,
    name: endpointName,
  });

  const createdEndpointFields = await Promise.all(
    fieldsToCreate.map((currentFieldToCreate) =>
      EndpointField.validateAndCreate({
        endpointId: createdEndpoint.id,
        fieldId: string,
      })
    )
  );

  const response: ResponseDTO = {
    endpoint: {
      createdAt: createdAt.toISOString(),
      deletedAt: deletedAt?.toISOString(),
      updatedAt: updatedAt.toISOString(),
      id,
      address,
    },
  };

  return respondSuccess(res, SUCCESS_CODE.OK, response);
};

export default createEndpoint;
