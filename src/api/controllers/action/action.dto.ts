import { OperatorEnum } from "src/utils/enum.util";

export interface IActionDTO {
  createdAt: string;
  deletedAt?: string;
  updatedAt: string;

  actionType: string;
  actionPayload: string | null;
  address: string;
  operator: OperatorEnum;
  threshold: string;

  // References
  endpointId: string;
}

// export interface IActionWithFieldsDTO extends IActionDTO {
//   fields: IActionFieldDTO[];
// }
