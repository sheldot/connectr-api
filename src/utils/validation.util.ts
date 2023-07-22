import Joi from "joi";

import {
  FieldEnumSet,
  ProductEnumSet,
  SourceEnum,
  TokenProductEnum,
} from "./enum.util";

export const HEX_REGEX = /^(0x|0X)?[a-fA-F0-9]+$/;

export const AddressValidation = Joi.string()
  .alphanum()
  .length(42)
  .pattern(HEX_REGEX, { name: "address" });

export const FieldValidation = Joi.string().valid(
  ...Object.values(FieldEnumSet)
);

export const ProductValidation = Joi.string().valid(
  ...Object.values(ProductEnumSet)
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