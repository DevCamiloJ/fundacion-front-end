export interface SisbenScore {
  id:        string;
  puntaje:   string;
  createdAt: Date; 
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CreateSisbenScoreDto {
  puntaje: string;
}

export interface UpdateSisbenScoreDto {
  puntaje: string;
}