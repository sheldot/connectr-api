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

import { ActionTypeEnum, OperatorEnum } from "src/utils/enum.util";
import {
  ActionTypeValidation,
  AddressValidation,
  OperatorValidation,
  SimpleStringValidation,
  UuidValidation,
} from "../../utils/validation.util";

import { IBaseAttributes } from "../IBaseAttributes";

import Endpoint from "./Endpoint.model";
import Field from "./Field.model";

export interface IActionCreationAttributes {
  actionType: ActionTypeEnum;
  actionPayload: string | null;
  address: string;
  name: string;
  operator: OperatorEnum;
  threshold: string;

  // References
  endpointId: string;
  fieldId: string;
}

export type IActionUpdatingAttributes = Partial<
  Pick<
    IActionCreationAttributes,
    | "address"
    | "actionType"
    | "actionPayload"
    | "name"
    | "operator"
    | "threshold"
    | "endpointId"
    | "fieldId"
  >
>;

export interface IActionAttributes
  extends IBaseAttributes,
    IActionCreationAttributes {}

export const ActionCreationAttributesSchema =
  Joi.object<IActionCreationAttributes>({
    // Variables
    actionPayload: SimpleStringValidation.optional(),
    actionType: ActionTypeValidation.required(),
    address: AddressValidation.required(),
    name: SimpleStringValidation.required(),
    operator: OperatorValidation.required(),
    threshold: SimpleStringValidation.required(),

    // References
    endpointId: UuidValidation.required(),
    fieldId: UuidValidation.required(),
  })
    .meta({ className: "IActionCreationAttributes" })
    .description("The attributes for the creation of an action db object");

@Table({
  tableName: "actions",
  paranoid: true,
  underscored: true,
})
export default class Action extends Model<
  IActionAttributes,
  IActionCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  actionPayload!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  actionType!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  address!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  operator!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  threshold!: string;

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

  static async getList(): Promise<IActionAttributes[]> {
    const queryParams: FindOptions<IActionAttributes> = {};

    const actions = await this.findAll(queryParams);

    return actions.map((a) => a.toJSON());
  }

  static async getOneById(id: string): Promise<IActionAttributes | null> {
    const action = await this.findByPk(id);

    return action ? action.toJSON() : null;
  }

  static async validateAndCreate(
    createdActionAttributes: IActionCreationAttributes
  ): Promise<IActionAttributes> {
    const validatedActionAttributes =
      await ActionCreationAttributesSchema.validateAsync(
        createdActionAttributes
      );

    return (await this.create(validatedActionAttributes)).toJSON();
  }
}
