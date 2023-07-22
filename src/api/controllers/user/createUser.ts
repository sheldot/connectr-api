import { Request, Response } from "express";

import User from "src/db/models/User.model";

import { IUserDTO } from "./user.dto";

interface ResponseDTO {
  user: IUserDTO;
}

const createUser = async (req: Request, res: Response) => {
  const { userId }: { userId: string } = req.body;

  const response: ResponseDTO = {
    user: await User.validateAndCreate({
      address: userId,
    }),
  };

  res.status(200).send(response);
};

export default createUser;
