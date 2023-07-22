import { Request, Response } from "express";

import User from "src/db/models/User.model";

import { IUserDTO } from "./user.dto";
import {
  ERROR_CODE,
  SUCCESS_CODE,
  respondError,
  respondSuccess,
} from "src/utils/responseManager.util";
import Joi from "joi";
import { AddressValidation } from "src/utils/validation.util";

interface IRequestParamsDTO {
  userAddress: string;
}
const RequestParamsDTO = Joi.object<IRequestParamsDTO, true>({
  userAddress: AddressValidation.required(),
});

interface ResponseDTO {
  user: IUserDTO;
}

const getUser = async (req: Request, res: Response) => {
  const { userAddress }: IRequestParamsDTO =
    await RequestParamsDTO.validateAsync(req?.params);

  const user = await User.getOneByAddress(userAddress);

  if (!user) {
    return respondError(res, ERROR_CODE.NOT_FOUND, "User does not exist");
  }

  const { createdAt, deletedAt, updatedAt, id, address } = user;

  const response: ResponseDTO = {
    user: {
      createdAt: createdAt.toISOString(),
      deletedAt: deletedAt?.toISOString(),
      updatedAt: updatedAt.toISOString(),
      id,
      address,
    },
  };

  return respondSuccess(res, SUCCESS_CODE.OK, response);
};

export default getUser;
