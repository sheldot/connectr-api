import { ActionTypeEnum, OperatorEnum } from "src/utils/enum.util";

export interface IActionDTO {
  createdAt: string;
  deletedAt?: string;
  updatedAt: string;

  id: string;

  actionType: ActionTypeEnum;
  actionPayload: string | null;
  address: string;
  name: string;
  operator: OperatorEnum;
  threshold: string;

  // References
  endpointId: string;
  fieldId: string;
}

export interface IDataPointDTO {
  createdAt: string;
  deletedAt?: string;
  updatedAt: string;

  id: string;
}
