export interface IEndpointDTO {
  createdAt: string;
  deletedAt?: string;
  updatedAt: string;

  id: string;
  name: string;

  // References
  userId: string;
}
