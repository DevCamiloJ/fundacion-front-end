export interface Country {
  id:        string;
  nombre:    string;
  createdAt: Date; 
  updatedAt: Date;
  deletedAt: Date | null;
}