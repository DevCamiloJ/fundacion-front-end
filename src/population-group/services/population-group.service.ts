import { axiosInstance } from '@/api/axiosInstance';
import { CreatePopulationGroupDto, PopulationGroup, UpdatePopulationGroupDto } from '../types/population-group';

export const populationGroupService = {
  findAll: async (): Promise<PopulationGroup[]> => {
    const response = await axiosInstance.get('population-group');
    return response.data;
  },
  create: async (populationGroup: CreatePopulationGroupDto): Promise<PopulationGroup> => {
    const response = await axiosInstance.post('population-group', populationGroup);
    return response.data;
  },
  update: async (id: string, populationGroup: UpdatePopulationGroupDto): Promise<PopulationGroup> => {
    const response = await axiosInstance.patch(`population-group/${id}`, populationGroup);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`population-group/${id}`);
  },
  restore: async (id: string): Promise<void> => {
    await axiosInstance.post(`population-group/${id}/restore`);
  },
  findOne: async (id: string): Promise<PopulationGroup> => {
    const response = await axiosInstance.get(`population-group/${id}`);
    return response.data;
  },
};
