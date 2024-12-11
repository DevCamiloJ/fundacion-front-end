export interface Disability {
  id:         string;
  nombre:     string;
  createdAt:  Date;
  updatedAt:  Date;
  deletedAt?: Date | null;
}

export interface CreateDisabilityDto {
  nombre: string;
}

export interface UpdateDisabilityDto {
  nombre: string;
}
