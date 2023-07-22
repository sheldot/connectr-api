import { Request, Response } from "express";
import Joi from "joi";

import { AddressValidation } from "src/utils/validation.util";

export interface IRequestHeaderDTO {
  userAddress: string;
}

export const RequestHeaderDTO = Joi.object<IRequestHeaderDTO, false>({
  userAddress: AddressValidation.required(),
});

export const validateUser: (req: Request) => Promise<IRequestHeaderDTO> = (
  req
) =>
  RequestHeaderDTO.validateAsync({
    userAddress: req?.headers?.user_id,
  });
