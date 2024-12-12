export interface InterestTopic {
  id:         string;
  nombre:     string;
  createdAt:  Date;
  updatedAt:  Date;
  deletedAt?: Date | null;
}

export interface CreateInterestTopicDto {
  nombre: string;
}

export interface UpdateInterestTopicDto {
  nombre: string;
}
