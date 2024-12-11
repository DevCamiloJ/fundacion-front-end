import { axiosInstance } from '@/api/axiosInstance';

export const epsService = {
  findAll: async () => {
    const response = await axiosInstance.get('eps');
    return response.data;
  },
  create: async (eps: Record<string, any>) => {
    const response = await axiosInstance.post('eps', eps);
    return response.data;
  },
  update: async (id: string, eps: Record<string, any>) => {
    const response = await axiosInstance.patch(`eps/${id}`, eps);
    return response.data;
  },
  delete: async (id: string) => {
    await axiosInstance.delete(`eps/${id}`);
  },
  restore: async (id: string) => {
    await axiosInstance.post(`eps/${id}/restore`);
  },
};
