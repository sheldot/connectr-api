import Joi from "joi";
import { FindOptions } from "sequelize";
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import {
  ProductTypeValidation,
  ProductValidation,
  UuidValidation,
} from "../../utils/validation.util";
import {
  DexProductEnum,
  LendingProductEnum,
  MiscProductEnum,
  ProductTypeEnum,
  TokenProductEnum,
} from "../../utils/enum.util";

import { IBaseAttributes } from "../IBaseAttributes";
import Source from "./Source.model";

export interface IProductCreationAttributes {
  productNameEnum:
    | DexProductEnum
    | LendingProductEnum
    | MiscProductEnum
    | TokenProductEnum;
  productTypeEnum: ProductTypeEnum;

  // References
  sourceId: string;
}

export type IProductUpdatingAttributes = Partial<
  Pick<
    IProductCreationAttributes,
    "productNameEnum" | "productTypeEnum" | "sourceId"
  >
>;

export interface IProductAttributes
  extends IBaseAttributes,
    IProductCreationAttributes {}

export const ProductCreationAttributesSchema =
  Joi.object<IProductCreationAttributes>({
    // Variables
    productNameEnum: ProductValidation.required(),
    productTypeEnum: ProductTypeValidation.required(),

    // References
    sourceId: UuidValidation.required(),
  })
    .meta({ className: "IProductCreationAttributes" })
    .description("The attributes for the creation of a field db object");

@Table({
  tableName: "products",
  paranoid: true,
  underscored: true,
})
export default class Product extends Model<
  IProductAttributes,
  IProductCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  productNameEnum!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  productTypeEnum!: string;

  @BelongsTo(() => Source, {
    foreignKey: { name: "sourceId", allowNull: false },
    as: "source",
  })
  sourceId!: Source;

  static async getList(): Promise<IProductAttributes[]> {
    const queryParams: FindOptions<IProductAttributes> = {};

    const products = await this.findAll(queryParams);

    return products.map((a) => a.toJSON());
  }

  static async getOneById(id: string): Promise<IProductAttributes | null> {
    const product = await this.findByPk(id);

    return product ? product.toJSON() : null;
  }

  static async getOneByName(
    productName:
      | DexProductEnum
      | LendingProductEnum
      | MiscProductEnum
      | TokenProductEnum
  ): Promise<IProductAttributes | null> {
    const product = await this.findOne({
      where: {
        productNameEnum: productName,
      },
    });

    return product ? product.toJSON() : null;
  }
}
