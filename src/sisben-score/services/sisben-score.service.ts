import { axiosInstance } from '@/api/axiosInstance';
import { CreateSisbenScoreDto, SisbenScore, UpdateSisbenScoreDto } from '../types/sysben-score';

export const sisbenScoreService = {
  findAll: async (): Promise<SisbenScore[]> => {
    const response = await axiosInstance.get('sisben-score');
    return response.data;
  },
  create: async (sisbenScore: CreateSisbenScoreDto): Promise<SisbenScore> => {
    const response = await axiosInstance.post('sisben-score', sisbenScore);
    return response.data;
  },
  update: async (id: string, sisbenScore: UpdateSisbenScoreDto): Promise<SisbenScore> => {
    const response = await axiosInstance.patch(`sisben-score/${id}`, sisbenScore);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`sisben-score/${id}`);
  },
  restore: async (id: string): Promise<void> => {
    await axiosInstance.post(`sisben-score/${id}/restore`);
  },
  findOne: async (id: string): Promise<SisbenScore> => {
    const response = await axiosInstance.get(`sisben-score/${id}`);
    return response.data;
  },
};
