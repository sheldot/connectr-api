import { Request, Response } from "express";
import Field, { IFieldAttributes } from "src/db/models/Field.model";
import Product, { IProductAttributes } from "src/db/models/Product.model";
import Source, { ISourceAttributes } from "src/db/models/Source.model";

import {
  DexFieldEnum,
  DexProductEnum,
  LendingFieldEnum,
  LendingProductEnum,
  MiscFieldEnum,
  MiscProductEnum,
  ProductTypeEnum,
  SourceEnum,
  TokenFieldEnum,
  TokenProductEnum,
} from "src/utils/enum.util";
import {
  ERROR_CODE,
  SUCCESS_CODE,
  respondError,
  respondSuccess,
} from "src/utils/responseManager.util";

const setup = async (req: Request, res: Response) => {
  // Add sources
  const sourceRequests: any[] = [];
  Object.keys(SourceEnum).forEach((sourceValue: string) => {
    sourceRequests.push(
      Source.create({
        sourceNameEnum: sourceValue as SourceEnum,
      })
    );
  });

  const sourceMap: Record<string, ISourceAttributes> = {};
  const rawSources = await Promise.all(sourceRequests);
  const sources = rawSources.map((currentSource) => {
    sourceMap[currentSource.sourceNameEnum] = currentSource.toJSON();
    return currentSource.toJSON();
  });

  // Add products
  const productRequests: any[] = [];
  Object.keys(DexProductEnum).forEach((productValue) => {
    productRequests.push(
      Product.create({
        productNameEnum: productValue as DexProductEnum,
        productTypeEnum: ProductTypeEnum.DEX,
        sourceId: sources[0].id,
      })
    );
  });
  Object.keys(LendingProductEnum).forEach((productValue) => {
    productRequests.push(
      Product.create({
        productNameEnum: productValue as LendingProductEnum,
        productTypeEnum: ProductTypeEnum.LENDING,
        sourceId: sources[0].id,
      })
    );
  });
  Object.keys(MiscProductEnum).forEach((productValue) => {
    productRequests.push(
      Product.create({
        productNameEnum: productValue as MiscProductEnum,
        productTypeEnum: ProductTypeEnum.MISC,
        sourceId: sources[0].id,
      })
    );
  });
  Object.keys(TokenProductEnum).forEach((productValue) => {
    productRequests.push(
      Product.create({
        productNameEnum: productValue as TokenProductEnum,
        productTypeEnum: ProductTypeEnum.TOKEN,
        sourceId: sources[0].id,
      })
    );
  });

  const productMap: Record<string, IProductAttributes> = {};
  const rawProducts = await Promise.all(productRequests);
  const products = rawProducts.map((currentProduct) => {
    productMap[currentProduct.productNameEnum] = currentProduct.toJSON();

    return currentProduct.toJSON();
  });

  // Add fields
  const fieldRequests: any[] = [];
  Object.keys(DexProductEnum).forEach((productValue) => {
    Object.keys(DexFieldEnum).forEach((fieldValue) => {
      fieldRequests.push(
        Field.create({
          fieldNameEnum: fieldValue as DexFieldEnum,
          productId: productMap[productValue].id,
        })
      );
    });
  });
  Object.keys(LendingProductEnum).forEach((productValue) => {
    Object.keys(LendingFieldEnum).forEach((fieldValue) => {
      fieldRequests.push(
        Field.create({
          fieldNameEnum: fieldValue as LendingFieldEnum,
          productId: productMap[productValue].id,
        })
      );
    });
  });
  Object.keys(MiscProductEnum).forEach((productValue) => {
    Object.keys(MiscFieldEnum).forEach((fieldValue) => {
      fieldRequests.push(
        Field.create({
          fieldNameEnum: fieldValue as MiscFieldEnum,
          productId: productMap[productValue].id,
        })
      );
    });
  });
  Object.keys(TokenProductEnum).forEach((productValue) => {
    Object.keys(TokenFieldEnum).forEach((fieldValue) => {
      fieldRequests.push(
        Field.create({
          fieldNameEnum: fieldValue as TokenFieldEnum,
          productId: productMap[productValue].id,
        })
      );
    });
  });

  const fieldMap: Record<string, IFieldAttributes> = {};
  const rawFields = await Promise.all(fieldRequests);
  const fields = rawFields.map((currentField) => {
    fieldMap[currentField.fieldNameEnum] = currentField.toJSON();

    return currentField.toJSON();
  });

  return respondSuccess(res, SUCCESS_CODE.OK, {
    sources,
    products,
    fields,
  });
};

export default setup;
