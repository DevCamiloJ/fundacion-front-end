import { axiosInstance } from '@/api/axiosInstance';

import { CreateDisabilityDto, Disability, UpdateDisabilityDto } from '../types/disability';

export const disabilityService = {
  findAll: async (): Promise<Disability[]> => {
    const response = await axiosInstance.get('disability');
    return response.data;
  },
  create: async (disability: CreateDisabilityDto): Promise<Disability> => {
    const response = await axiosInstance.post('disability', disability);
    return response.data;
  },
  update: async (id: string, disability: UpdateDisabilityDto): Promise<Disability> => {
    const response = await axiosInstance.patch(`disability/${id}`, disability);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`disability/${id}`);
  },
  restore: async (id: string): Promise<void> => {
    await axiosInstance.post(`disability/${id}/restore`);
  },
  findOne: async (id: string): Promise<Disability> => {
    const response = await axiosInstance.get(`disability/${id}`);
    return response.data;
  },
};
