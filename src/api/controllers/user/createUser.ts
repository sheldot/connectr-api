import { Request, Response } from "express";
import Joi from "joi";

import User from "src/db/models/User.model";
import { AddressValidation } from "src/utils/validation.util";

import { IUserDTO } from "./user.dto";

interface IRequestBodyDTO {
  userAddress: string;
}
const RequestBodyDTO = Joi.object<IRequestBodyDTO, true>({
  userAddress: AddressValidation.required(),
});

interface ResponseDTO {
  user: IUserDTO;
}

const createUser = async (req: Request, res: Response) => {
  const { userAddress }: IRequestBodyDTO = await RequestBodyDTO.validateAsync(
    req?.body
  );

  const { createdAt, deletedAt, updatedAt, id, address } =
    await User.validateAndCreate({
      address: userAddress,
    });

  const response: ResponseDTO = {
    user: {
      createdAt: createdAt.toISOString(),
      deletedAt: deletedAt?.toISOString(),
      updatedAt: updatedAt.toISOString(),
      id,
      address,
    },
  };

  res.status(200).send(response);
};

export default createUser;
