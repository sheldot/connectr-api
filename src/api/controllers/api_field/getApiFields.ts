import { Request, Response } from "express";

import ApiField from "src/db/models/ApiField.model";
import Field from "src/db/models/Field.model";

import { IApiFieldDTO, IFieldDTO, IProductDTO } from "./apiField.dto";
import Product from "src/db/models/Product.model";

interface ResponseDTO {
  apiFields: IApiFieldDTO[];
}

const getApiFields = async (req: Request, res: Response) => {
  const { apiId } = req.params;
  const { userId } = req.headers;

  try {
    const apiFieldIds: any[] = [];
    const apiFields = (
      await ApiField.findAll({
        where: {
          // userId: userId,
          apiId,
        },
      })
    ).map((a) => {
      apiFieldIds.push(a.id);
      return a.toJSON();
    });

    // Get the fields
    const fields = (
      await Field.findAll({
        where: {
          id: { $in: apiFieldIds },
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
    products.forEach(({ id, productNameEnum, sourceId }) => {
      productMap[id] = { productNameEnum, sourceId };
    });

    const response: ResponseDTO = {
      apiFields: apiFields.map(
        ({ createdAt, deletedAt, updatedAt, id, apiId, fieldId }) => ({
          createdAt: createdAt.toISOString(),
          deletedAt: deletedAt?.toISOString(),
          updatedAt: updatedAt.toISOString(),
          id,
          apiId,
          fieldId,
          field: fieldMap[fieldId],
          product: productMap[fieldMap[fieldId].productId],
        })
      ),
    };

    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export default getApiFields;
