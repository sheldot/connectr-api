import {
  DexFieldEnum,
  DexProductEnum,
  LendingFieldEnum,
  LendingProductEnum,
  MiscFieldEnum,
  MiscProductEnum,
  ProductTypeEnum,
  TokenFieldEnum,
  TokenProductEnum,
} from "src/utils/enum.util";

export interface IProductDTO {
  productNameEnum:
    | DexProductEnum
    | LendingProductEnum
    | MiscProductEnum
    | TokenProductEnum;
  productTypeEnum: ProductTypeEnum;

  // References
  sourceId: string;
}

export interface IFieldDTO {
  fieldNameEnum:
    | DexFieldEnum
    | LendingFieldEnum
    | MiscFieldEnum
    | TokenFieldEnum;

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
}

export interface IEndpointFieldFullDTO {
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
