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
import User from "./User.model";

export interface IApiCreationAttributes {
  // References
  userId: string;
}

export type IApiUpdatingAttributes = Partial<
  Pick<IApiCreationAttributes, "userId">
>;

export interface IApiAttributes
  extends IBaseAttributes,
    IApiCreationAttributes {}

export const ApiCreationAttributesSchema = Joi.object<IApiCreationAttributes>({
  // Variables

  // References
  userId: UuidValidation.required(),
})
  .meta({ className: "IApiCreationAttributes" })
  .description("The attributes for the creation of a field db object");

@Table({
  tableName: "apis",
  paranoid: true,
  underscored: true,
})
export default class Api extends Model<IApiAttributes, IApiCreationAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @BelongsTo(() => User, {
    foreignKey: { name: "userId", allowNull: false },
    as: "user",
  })
  userId!: User;

  static async getList(): Promise<IApiAttributes[]> {
    const queryParams: FindOptions<IApiAttributes> = {};

    const apis = await this.findAll(queryParams);

    return apis.map((a) => a.toJSON());
  }

  static async getOneById(id: string): Promise<IApiAttributes | null> {
    const api = await this.findByPk(id);

    return api ? api.toJSON() : null;
  }
}
