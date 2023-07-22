import Joi from "joi";

import {
  DexFieldEnum,
  DexProductEnum,
  // FieldEnumSet,
  LendingFieldEnum,
  LendingProductEnum,
  MiscFieldEnum,
  MiscProductEnum,
  OperatorEnum,
  // ProductEnumSet,
  SourceEnum,
  TokenFieldEnum,
  TokenProductEnum,
} from "./enum.util";

export const HEX_REGEX = /^(0x|0X)?[a-fA-F0-9]+$/;

export const AddressValidation = Joi.string()
  .alphanum()
  .length(42)
  .pattern(HEX_REGEX, { name: "address" });

export const FieldValidation = Joi.string().valid(
  ...Object.values(DexFieldEnum),
  ...Object.values(LendingFieldEnum),
  ...Object.values(MiscFieldEnum),
  ...Object.values(TokenFieldEnum)
);

export const OperatorValidation = Joi.string().valid(
  ...Object.values(OperatorEnum)
);

export const ProductValidation = Joi.string().valid(
  ...Object.values(DexProductEnum),
  ...Object.values(LendingProductEnum),
  ...Object.values(MiscProductEnum),
  ...Object.values(TokenProductEnum)
);

export const SourceValidation = Joi.string().valid(
  ...Object.values(SourceEnum)
);

export const TokenProductValidation = Joi.string().valid(
  ...Object.values(TokenProductEnum)
);

export const UuidValidation = Joi.string().guid({
  version: ["uuidv4"],
});

export const SimpleStringValidation = Joi.string().min(1);
