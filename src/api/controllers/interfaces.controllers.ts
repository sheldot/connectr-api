import { Request, Response } from "express";
import Joi from "joi";

import User from "src/db/models/User.model";
import { ERROR_CODE, respondError } from "src/utils/responseManager.util";
import { AddressValidation } from "src/utils/validation.util";

export interface IRequestHeaderDTO {
  userAddress: string;
}

export const RequestHeaderDTO = Joi.object<IRequestHeaderDTO, false>({
  userAddress: AddressValidation.required(),
});

export const validateUser = async (req: Request, res: Response) => {
  const { userAddress } = await RequestHeaderDTO.validateAsync({
    userAddress: req?.headers?.user_id,
  });

  const user = await User.getOneByAddress(userAddress);

  if (!user) {
    throw new Error("User does not exist");
  }

  return user;
};
