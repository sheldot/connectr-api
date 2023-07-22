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

export interface IEndpointFieldDTO {
  createdAt: string;
  deletedAt?: string;
  updatedAt: string;

  id: string;

  // References
  endpointId: string;
  fieldId: string;

  // filled in
  field: IFieldDTO;
  product: IProductDTO;
}
