import { axiosInstance } from '@/api/axiosInstance';

export const countriesService = {
  findAll: async () => {
    const response = await axiosInstance.get('countries');
    return response.data;
  },
  create: async (country: Record<string, any>) => {
    const response = await axiosInstance.post('countries', country);
    return response.data;
  },
  update: async (id: string, country: Record<string, any>) => {
    const response = await axiosInstance.patch(`countries/${id}`, country);
    return response.data;
  },
  delete: async (id: string) => {
    await axiosInstance.delete(`countries/${id}`);
  },
  restore: async (id: string) => {
    await axiosInstance.post(`countries/${id}/restore`);
  },
};
