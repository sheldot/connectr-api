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

import { FieldEnum, ProductEnum } from "src/utils/enum.util";

import {
  FieldValidation,
  ProductValidation,
  UuidValidation,
} from "../../utils/validation.util";

import { IBaseAttributes } from "../IBaseAttributes";
import Endpoint from "./Endpoint.model";
import Field from "./Field.model";

export interface IEndpointFieldCreationAttributes {
  // References
  endpointId: string;
  fieldId: string;
}

export const EndpointFieldCreationAttributesSchema =
  Joi.object<IEndpointFieldCreationAttributes>({
    // Variables

    // References
    endpointId: UuidValidation.required(),
    fieldId: UuidValidation.required(),
  })
    .meta({ className: "IEndpointFieldCreationAttributes" })
    .description(
      "The attributes for the creation of an endpoint field db object"
    );

export interface IEndpointFieldCreationByNameAttributes {
  fieldName: FieldEnum;
  productName: ProductEnum;

  // References
  endpointId: string;
}

export const EndpointFieldCreationByNameAttributesSchema =
  Joi.object<IEndpointFieldCreationByNameAttributes>({
    // Variables
    fieldName: FieldValidation.required(),
    productName: ProductValidation.required(),

    // References
    endpointId: UuidValidation.required(),
  })
    .meta({ className: "EndpointFieldCreationByNameAttributesSchema" })
    .description(
      "The attributes for the creation of an endpoint field db object"
    );

export type IEndpointFieldUpdatingAttributes = Partial<
  Pick<IEndpointFieldCreationAttributes, "endpointId" | "fieldId">
>;

export interface IEndpointFieldAttributes
  extends IBaseAttributes,
    IEndpointFieldCreationAttributes {}

@Table({
  tableName: "endpoint_fields",
  paranoid: true,
  underscored: true,
})
export default class EndpointField extends Model<
  IEndpointFieldAttributes,
  IEndpointFieldCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @BelongsTo(() => Endpoint, {
    foreignKey: { name: "endpointId", allowNull: false },
    as: "endpoint",
  })
  endpointId!: Endpoint;

  @BelongsTo(() => Field, {
    foreignKey: { name: "fieldId", allowNull: false },
    as: "field",
  })
  fieldId!: Field;

  static async getList(): Promise<IEndpointFieldAttributes[]> {
    const queryParams: FindOptions<IEndpointFieldAttributes> = {};

    const endpointFields = await this.findAll(queryParams);

    return endpointFields.map((a) => a.toJSON());
  }

  static async getOneById(
    id: string
  ): Promise<IEndpointFieldAttributes | null> {
    const endpointField = await this.findByPk(id);

    return endpointField ? endpointField.toJSON() : null;
  }

  static async validateAndCreate(
    createdEndpointFieldAttributes: IEndpointFieldCreationAttributes
  ): Promise<IEndpointFieldAttributes> {
    const validatedEndpointFieldAttributes =
      await EndpointFieldCreationAttributesSchema.validateAsync(
        createdEndpointFieldAttributes
      );

    return (await this.create(validatedEndpointFieldAttributes)).toJSON();
  }

  static async validateAndCreateByFieldName(
    createdEndpointFieldAttributes: IEndpointFieldCreationByNameAttributes
  ): Promise<IEndpointFieldAttributes> {
    const validatedEndpointFieldAttributes =
      await EndpointFieldCreationByNameAttributesSchema.validateAsync(
        createdEndpointFieldAttributes
      );

    const fieldObj = await Field.getOneByName(
      validatedEndpointFieldAttributes.productName,
      validatedEndpointFieldAttributes.fieldName
    );

    if (!fieldObj) {
      throw new Error("Field not found");
    }

    return (
      await this.create({
        endpointId: validatedEndpointFieldAttributes.endpointId,
        fieldId: fieldObj?.id,
      })
    ).toJSON();
  }
}
