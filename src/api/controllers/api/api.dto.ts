export interface IApiDTO {
  createdAt: string;
  deletedAt?: string;
  updatedAt: string;

  id: string;

  // References
  userId: string;
}
