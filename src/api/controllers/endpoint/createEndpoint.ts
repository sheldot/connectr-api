import { Request, Response } from "express";
import Joi from "joi";

import Endpoint from "src/db/models/Endpoint.model";
import EndpointField from "src/db/models/EndpointField.model";
import { SUCCESS_CODE, respondSuccess } from "src/utils/responseManager.util";
import {
  AddressValidation,
  SimpleStringValidation,
} from "src/utils/validation.util";

import { IEndpointWithFieldsDTO } from "./endpoint.dto";

interface IRequestHeaderDTO {
  userId: string;
}
const RequestHeaderDTO = Joi.object<IRequestHeaderDTO, true>({
  userId: AddressValidation.required(),
});

interface IRequestBodyDTO {
  name: string;
  fieldsToCreate: string[];
}
const RequestBodyDTO = Joi.object<IRequestBodyDTO, true>({
  name: SimpleStringValidation.required(),
  fieldsToCreate: Joi.array().items(SimpleStringValidation).required(),
});

interface ResponseDTO {
  endpoint: IEndpointWithFieldsDTO;
}

const createEndpoint = async (req: Request, res: Response) => {
  const { userId }: IRequestHeaderDTO = await RequestHeaderDTO.validateAsync(
    req?.headers
  );

  const { name: endpointName, fieldsToCreate }: IRequestBodyDTO =
    await RequestBodyDTO.validateAsync(req?.body);

  const createdEndpoint = await Endpoint.validateAndCreate({
    name: endpointName,
    userId,
  });

  const createdEndpointFields = await Promise.all(
    fieldsToCreate.map((fieldId) =>
      EndpointField.validateAndCreate({
        endpointId: createdEndpoint.id,
        fieldId,
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
