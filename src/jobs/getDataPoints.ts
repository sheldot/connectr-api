import DataPoint from "src/db/models/DataPoint.model";

import { IDataPointDTO } from "./_.dto";

interface ResponseDTO {
  dataPoints: IDataPointDTO[];
}

const getAllDataPoints = async () => {
  const dataPoints = (await DataPoint.findAll({})).map((a) => a.toJSON());

  const response: ResponseDTO = {
    dataPoints: dataPoints.map(
      ({
        createdAt,
        deletedAt,
        updatedAt,
        id,

        block,
        timestamp,
        fieldNameEnum,
        productNameEnum,
        sourceNameEnum,
        value,
        token1,
        token2,
        token3,
        token4,
      }) => ({
        createdAt: createdAt.toISOString(),
        deletedAt: deletedAt?.toISOString(),
        updatedAt: updatedAt.toISOString(),
        id,

        block,
        timestamp,
        fieldNameEnum,
        productNameEnum,
        sourceNameEnum,
        value,
        token1,
        token2,
        token3,
        token4,
      })
    ),
  };

  return response;
};

export default getAllDataPoints;
