import { axiosInstance } from '@/api/axiosInstance';
import { CreateEthnicGroupDto, EthnicGroup, UpdateEthnicGroupDto } from '../types/ethnic-group';

export const ethnicGroupService = {
  findAll: async (): Promise<EthnicGroup[]> => {
    const response = await axiosInstance.get('ethnic-group');
    return response.data;
  },
  create: async (ethnicGroup: CreateEthnicGroupDto): Promise<EthnicGroup> => {
    const response = await axiosInstance.post('ethnic-group', ethnicGroup);
    return response.data;
  },
  update: async (id: string, ethnicGroup: UpdateEthnicGroupDto): Promise<EthnicGroup> => {
    const response = await axiosInstance.patch(`ethnic-group/${id}`, ethnicGroup);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`ethnic-group/${id}`);
  },
  restore: async (id: string): Promise<void> => {
    await axiosInstance.post(`ethnic-group/${id}/restore`);
  },
  findOne: async (id: string): Promise<EthnicGroup> => {
    const response = await axiosInstance.get(`ethnic-group/${id}`);
    return response.data;
  },
};
