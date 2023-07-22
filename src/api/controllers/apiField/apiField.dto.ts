import { FieldEnum, ProductEnum } from "src/utils/enum.util";

export interface IProductDTO {
  productNameEnum: ProductEnum;

  // References
  sourceId: string;
}

export interface IFieldDTO {
  fieldNameEnum: FieldEnum;

  // References
  productId: string;
}

export interface IApiFieldDTO {
  createdAt: string;
  deletedAt?: string;
  updatedAt: string;

  id: string;

  // References
  apiId: string;
  fieldId: string;

  // filled in
  field: IFieldDTO;
  product: IProductDTO;
}
