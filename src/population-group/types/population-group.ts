export interface PopulationGroup {
  id:        string;
  nombre:    string;
  createdAt: Date; 
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CreatePopulationGroupDto {
  nombre: string;
}

export interface UpdatePopulationGroupDto {
  nombre: string;
}
