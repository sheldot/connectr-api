import { Request, Response } from "express";
import Joi from "joi";

import { AddressValidation } from "src/utils/validation.util";

export interface IRequestHeaderDTO {
  user_id: string;
}

export const RequestHeaderDTO = Joi.object<IRequestHeaderDTO, false>({
  user_id: AddressValidation.required(),
});

export const validateUser: (req: Request) => Promise<IRequestHeaderDTO> = (
  req
) =>
  RequestHeaderDTO.validateAsync({
    user_id: req?.headers?.user_id,
  });
