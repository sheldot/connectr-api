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
  SimpleStringValidation,
  UuidValidation,
} from "../../utils/validation.util";

import { IBaseAttributes } from "../IBaseAttributes";
import User from "./User.model";

export interface IEndpointCreationAttributes {
  name: string;

  // References
  userId: string;
}

export type IEndpointUpdatingAttributes = Partial<
  Pick<IEndpointCreationAttributes, "name" | "userId">
>;

export interface IEndpointAttributes
  extends IBaseAttributes,
    IEndpointCreationAttributes {}

export const EndpointCreationAttributesSchema =
  Joi.object<IEndpointCreationAttributes>({
    // Variables
    name: SimpleStringValidation.required(),

    // References
    userId: UuidValidation.required(),
  })
    .meta({ className: "IEndpointCreationAttributes" })
    .description("The attributes for the creation of a field db object");

@Table({
  tableName: "endpoints",
  paranoid: true,
  underscored: true,
})
export default class Endpoint extends Model<
  IEndpointAttributes,
  IEndpointCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @BelongsTo(() => User, {
    foreignKey: { name: "userId", allowNull: false },
    as: "user",
  })
  userId!: User;

  static async getList(): Promise<IEndpointAttributes[]> {
    const queryParams: FindOptions<IEndpointAttributes> = {};

    const endpoints = await this.findAll(queryParams);

    return endpoints.map((a) => a.toJSON());
  }

  static async getOneById(id: string): Promise<IEndpointAttributes | null> {
    const endpoint = await this.findByPk(id);

    return endpoint ? endpoint.toJSON() : null;
  }

  static async getOneByUser(
    id: string,
    userAddress: string
  ): Promise<IEndpointAttributes | null> {
    const userObj = await User.getOneByAddress(userAddress);

    if (!userObj) {
      throw new Error("User not found");
    }

    const endpoint = await this.findOne({
      where: {
        id,
        userId: userObj.id,
      },
    });

    return endpoint ? endpoint.toJSON() : null;
  }

  static async validateAndCreate(
    createdEndpointAttributes: IEndpointCreationAttributes
  ): Promise<IEndpointAttributes> {
    const validatedEndpointAttributes =
      await EndpointCreationAttributesSchema.validateAsync(
        createdEndpointAttributes
      );

    return (await this.create(validatedEndpointAttributes)).toJSON();
  }
}
