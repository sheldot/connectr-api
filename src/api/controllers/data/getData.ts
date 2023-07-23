import { Request, Response } from "express";
import Joi from "joi";

import DataPoint from "src/db/models/DataPoint.model";
import { SUCCESS_CODE, respondSuccess } from "src/utils/responseManager.util";
import { UuidValidation } from "src/utils/validation.util";

import { validateUser } from "../interfaces.controllers";
import { getEndpointRawFields } from "../endpoint_field/getEndpointFields";

import { IDataDTO } from "./data.dto";

interface IRequestParamsDTO {
  endpointId: string;
}
const RequestParamsDTO = Joi.object<IRequestParamsDTO, true>({
  endpointId: UuidValidation.required(),
});

interface ResponseDTO {
  data: IDataDTO[];
}

interface ResponseDTO {
  data: IDataDTO[];
}

const getData = async (req: Request, res: Response) => {
  const user = await validateUser(req, res);
  const { endpointId }: IRequestParamsDTO =
    await RequestParamsDTO.validateAsync(req?.params);

  const endpointFields = await getEndpointRawFields(user, endpointId);

  console.log("endpointFields");
  console.log(endpointFields);

  // const data = (
  //   await DataPoint.findAll({
  //     where: {
  //       userId: user.id,
  //     },
  //   })
  // ).map((a) => a.toJSON());

  const response: ResponseDTO = {
    data: [],
    // data: data.map(
    //   ({
    //     createdAt,
    //     deletedAt,
    //     updatedAt,
    //     id,

    //     timestamp,
    //     block,

    //     sourceNameEnum,
    //     productNameEnum,
    //     fieldNameEnum,

    //     token1,
    //     token2,
    //     token3,
    //     token4,
    //   }) => ({
    //     createdAt: createdAt.toISOString(),
    //     deletedAt: deletedAt?.toISOString(),
    //     updatedAt: updatedAt.toISOString(),
    //     id,

    //     timestamp,
    //     block,

    //     sourceNameEnum,
    //     productNameEnum,
    //     fieldNameEnum,

    //     token1,
    //     token2,
    //     token3,
    //     token4,
    //   })
    // ),
  };

  return respondSuccess(res, SUCCESS_CODE.OK, response);
};

export default getData;
