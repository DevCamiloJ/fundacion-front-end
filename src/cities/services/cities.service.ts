import { axiosInstance } from '@/api/axiosInstance';

export const citiesService = {
  create: async (city: Record<string, any>) => {
    const response = await axiosInstance.post('cities', city);
    return response.data;
  },

  findAll: async (): Promise<Record<string, any>[]> => {
    const response = await axiosInstance.get('cities');
    return response.data;
  },

  findOne: async (id: string): Promise<Record<string, any>> => {
    const response = await axiosInstance.get(`cities/${id}`);
    return response.data;
  },

  findByDepartment: async (departmentId: string): Promise<Record<string, any>[]> => {
    const response = await axiosInstance.get(`cities/departamento/${departmentId}`);
    return response.data;
  },

  update: async (id: string, city: Record<string, any>): Promise<Record<string, any>> => {
    const response = await axiosInstance.patch(`cities/${id}`, city);
    return response.data;
  },

  remove: async (id: string): Promise<void> => {
    await axiosInstance.delete(`cities/${id}`);
  },

  restore: async (id: string): Promise<void> => {
    await axiosInstance.post(`cities/${id}/restore`);
  },
};
