import { Request, Response } from "express";
import Joi from "joi";

import EndpointField from "src/db/models/EndpointField.model";
import Field from "src/db/models/Field.model";
import Product from "src/db/models/Product.model";
import {
  ERROR_CODE,
  SUCCESS_CODE,
  respondError,
  respondSuccess,
} from "src/utils/responseManager.util";
import { UuidValidation } from "src/utils/validation.util";

import { validateUser } from "../interfaces.controllers";

import {
  IEndpointFieldFullDTO,
  IFieldDTO,
  IProductDTO,
} from "./endpointField.dto";

interface IRequestParamsDTO {
  endpointId: string;
}
const RequestParamsDTO = Joi.object<IRequestParamsDTO, true>({
  endpointId: UuidValidation.required(),
});

interface ResponseDTO {
  endpointFields: IEndpointFieldFullDTO[];
}

const getEndpointFields = async (req: Request, res: Response) => {
  const { user_id } = await validateUser(req);
  const { endpointId }: IRequestParamsDTO =
    await RequestParamsDTO.validateAsync(req?.params);

  try {
    const endpointFieldIds: any[] = [];
    const endpointFields = (
      await EndpointField.findAll({
        where: {
          // userId: user_id,
          endpointId,
        },
      })
    ).map((a) => {
      endpointFieldIds.push(a.id);
      return a.toJSON();
    });

    // Get the fields
    const fields = (
      await Field.findAll({
        where: {
          id: { $in: endpointFieldIds },
        },
      })
    ).map((a) => a.toJSON());

    const productIds: any[] = [];

    const fieldMap: Record<string, IFieldDTO> = {};
    fields.forEach(({ id, fieldNameEnum, productId }) => {
      fieldMap[id] = { fieldNameEnum, productId };
      productIds.push(productId);
    });

    // Get the products
    const products = (
      await Product.findAll({
        where: {
          id: { $in: productIds },
        },
      })
    ).map((a) => a.toJSON());

    const productMap: Record<string, IProductDTO> = {};
    products.forEach(({ id, productNameEnum, productTypeEnum, sourceId }) => {
      productMap[id] = { productNameEnum, productTypeEnum, sourceId };
    });

    const response: ResponseDTO = {
      endpointFields: endpointFields.map(
        ({ createdAt, deletedAt, updatedAt, id, endpointId, fieldId }) => ({
          createdAt: createdAt.toISOString(),
          deletedAt: deletedAt?.toISOString(),
          updatedAt: updatedAt.toISOString(),
          id,
          endpointId,
          fieldId,
          field: fieldMap[fieldId],
          product: productMap[fieldMap[fieldId].productId],
        })
      ),
    };

    return respondSuccess(res, SUCCESS_CODE.OK, response);
  } catch (err) {
    console.log(err);
    return respondError(res, ERROR_CODE.INTERNAL_ERROR, JSON.stringify(err));
  }
};

export default getEndpointFields;
