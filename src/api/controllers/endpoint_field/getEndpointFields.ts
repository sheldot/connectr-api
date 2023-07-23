import { Request, Response } from "express";
import Joi from "joi";

import Endpoint from "src/db/models/Endpoint.model";
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
import { Op } from "sequelize";
import Source from "src/db/models/Source.model";
import { SourceEnum } from "src/utils/enum.util";

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
  const user = await validateUser(req, res);
  const { endpointId }: IRequestParamsDTO =
    await RequestParamsDTO.validateAsync(req?.params);

  try {
    const endpoint = await Endpoint.getOneByUser(endpointId, user.id);

    if (!endpoint) {
      throw new Error("Endpoint does not exist");
    }

    const endpointFieldIds: any[] = [];
    const endpointFields = (
      await EndpointField.findAll({
        where: {
          endpointId,
        },
      })
    ).map((a) => {
      const fieldElement = a.toJSON();
      console.log("--- fieldElement");
      console.log(fieldElement);
      endpointFieldIds.push(fieldElement.fieldId);
      return fieldElement;
    });

    console.log("--- endpointFieldIds");
    console.log(endpointFieldIds);

    console.log("--- endpointId");
    console.log(endpointId);
    console.log("--- endpointFields");
    console.log(endpointFields);

    // Get the fields
    const fields = (
      await Field.findAll({
        where: {
          id: { [Op.in]: endpointFieldIds },
        },
      })
    ).map((a) => a.toJSON());

    const productIds: any[] = [];

    const fieldMap: Record<string, IFieldDTO> = {};
    fields.forEach(({ id, fieldNameEnum, productId }) => {
      fieldMap[id] = { fieldNameEnum, productId };
      console.log("--- productId");
      console.log(productId);
      productIds.push(productId);
    });

    // Get the products
    const sourceIds: any[] = [];
    const products = (
      await Product.findAll({
        where: {
          id: { [Op.in]: productIds },
        },
      })
    ).map((a) => {
      const productElement = a.toJSON();

      sourceIds.push(productElement.sourceId);

      return productElement;
    });

    const productMap: Record<string, IProductDTO> = {};
    products.forEach(({ id, productNameEnum, productTypeEnum, sourceId }) => {
      productMap[id] = { productNameEnum, productTypeEnum, sourceId };
    });

    // Get the sources
    const sources = (
      await Source.findAll({
        where: {
          id: { [Op.in]: sourceIds },
        },
      })
    ).map((a) => a.toJSON());

    const sourceMap: Record<string, SourceEnum> = {};
    sources.forEach(({ id, sourceNameEnum }) => {
      sourceMap[id] = sourceNameEnum;
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
          source: sourceMap[productMap[fieldMap[fieldId].productId].sourceId],
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
