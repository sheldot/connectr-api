import Joi from "joi";
import { FindOptions } from "sequelize";
import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import { AddressValidation } from "../../utils/validation.util";

import { IBaseAttributes } from "../IBaseAttributes";

export interface IUserCreationAttributes {
  address: string;

  // References
}

export type IUserUpdatingAttributes = Partial<
  Pick<IUserCreationAttributes, "address">
>;

export interface IUserAttributes
  extends IBaseAttributes,
    IUserCreationAttributes {}

export const UserCreationAttributesSchema = Joi.object<IUserCreationAttributes>(
  {
    // Variables
    address: AddressValidation.required(),

    // References
  }
)
  .meta({ className: "IUserCreationAttributes" })
  .description("The attributes for the creation of a user db object");

@Table({
  tableName: "users",
  paranoid: true,
  underscored: true,
})
export default class User extends Model<
  IUserAttributes,
  IUserCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  address!: string;

  static async getList(): Promise<IUserAttributes[]> {
    const queryParams: FindOptions<IUserAttributes> = {};

    const addresses = await this.findAll(queryParams);

    return addresses.map((a) => a.toJSON());
  }

  static async getOneById(id: string): Promise<IUserAttributes | null> {
    const address = await this.findByPk(id);

    return address ? address.toJSON() : null;
  }
}
