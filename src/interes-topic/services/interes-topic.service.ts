import { axiosInstance } from '@/api/axiosInstance';

import { CreateInterestTopicDto, InterestTopic, UpdateInterestTopicDto } from '../types/interes-topic';

export const interestTopicService = {
  findAll: async (): Promise<InterestTopic[]> => {
    const response = await axiosInstance.get('interest-topic');
    return response.data;
  },
  create: async (interestTopic: CreateInterestTopicDto): Promise<InterestTopic> => {
    const response = await axiosInstance.post('interest-topic', interestTopic);
    return response.data;
  },
  update: async (id: string, interestTopic: UpdateInterestTopicDto): Promise<InterestTopic> => {
    const response = await axiosInstance.patch(`interest-topic/${id}`, interestTopic);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`interest-topic/${id}`);
  },
  restore: async (id: string): Promise<void> => {
    await axiosInstance.post(`interest-topic/${id}/restore`);
  },
  findOne: async (id: string): Promise<InterestTopic> => {
    const response = await axiosInstance.get(`interest-topic/${id}`);
    return response.data;
  },
};
