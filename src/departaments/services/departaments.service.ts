import { axiosInstance } from '@/api/axiosInstance';

export const departmentsService = {
  findAll: async () => {
    const response = await axiosInstance.get('departments');
    return response.data;
  },
  create: async (department: Record<string, any>) => {
    const response = await axiosInstance.post('departments', department);
    return response.data;
  },
  update: async (id: string, department: Record<string, any>) => {
    const response = await axiosInstance.patch(`departments/${id}`, department);
    return response.data;
  },
  delete: async (id: string) => {
    await axiosInstance.delete(`departments/${id}`);
  },
  restore: async (id: string) => {
    await axiosInstance.post(`departments/${id}/restore`);
  },
  findByCountry: async (paisId: string) => {
    const response = await axiosInstance.get(`departments/pais/${paisId}`);
    return response.data;
  },
};
