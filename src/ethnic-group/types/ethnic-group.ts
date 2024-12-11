export interface EthnicGroup {
  id:         string;
  nombre:     string;
  createdAt:  string;
  updatedAt:  string;
  deletedAt?: string | null;
}

export interface CreateEthnicGroupDto {
  nombre: string;
}

export interface UpdateEthnicGroupDto {
  nombre: string;
}
