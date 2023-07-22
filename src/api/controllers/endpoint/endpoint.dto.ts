import { IEndpointFieldDTO } from "../endpoint_field/endpointField.dto";

export interface IEndpointDTO {
  createdAt: string;
  deletedAt?: string;
  updatedAt: string;

  id: string;
  name: string;

  // References
  userId: string;
}

export interface IEndpointWithFieldsDTO extends IEndpointDTO {
  fields: IEndpointFieldDTO[];
}
