import { Request, Response } from "express";

import EndpointField from "src/db/models/EndpointField.model";
import Field from "src/db/models/Field.model";

import { IEndpointFieldDTO, IFieldDTO, IProductDTO } from "./endpointField.dto";
import Product from "src/db/models/Product.model";

interface ResponseDTO {
  endpointFields: IEndpointFieldDTO[];
}

const getEndpointFields = async (req: Request, res: Response) => {
  const { endpointId } = req.params;
  const { userId } = req.headers;

  try {
    const endpointFieldIds: any[] = [];
    const endpointFields = (
      await EndpointField.findAll({
        where: {
          // userId: userId,
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
    products.forEach(({ id, productNameEnum, sourceId }) => {
      productMap[id] = { productNameEnum, sourceId };
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

    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export default getEndpointFields;
