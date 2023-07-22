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

import { UuidValidation } from "../../utils/validation.util";

import { IBaseAttributes } from "../IBaseAttributes";
import Api from "./Api.model";
import Field from "./Field.model";

export interface IApiFieldCreationAttributes {
  // References
  apiId: string;
  fieldId: string;
}

export type IApiFieldUpdatingAttributes = Partial<
  Pick<IApiFieldCreationAttributes, "apiId" | "fieldId">
>;

export interface IApiFieldAttributes
  extends IBaseAttributes,
    IApiFieldCreationAttributes {}

export const ApiFieldCreationAttributesSchema =
  Joi.object<IApiFieldCreationAttributes>({
    // Variables

    // References
    apiId: UuidValidation.required(),
    fieldId: UuidValidation.required(),
  })
    .meta({ className: "IApiFieldCreationAttributes" })
    .description("The attributes for the creation of an api field db object");

@Table({
  tableName: "api_fields",
  paranoid: true,
  underscored: true,
})
export default class ApiField extends Model<
  IApiFieldAttributes,
  IApiFieldCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @BelongsTo(() => Api, {
    foreignKey: { name: "apiId", allowNull: false },
    as: "api",
  })
  apiId!: Api;

  @BelongsTo(() => Field, {
    foreignKey: { name: "fieldId", allowNull: false },
    as: "field",
  })
  fieldId!: Field;

  static async getList(): Promise<IApiFieldAttributes[]> {
    const queryParams: FindOptions<IApiFieldAttributes> = {};

    const apiFields = await this.findAll(queryParams);

    return apiFields.map((a) => a.toJSON());
  }

  static async getOneById(id: string): Promise<IApiFieldAttributes | null> {
    const apiField = await this.findByPk(id);

    return apiField ? apiField.toJSON() : null;
  }
}
