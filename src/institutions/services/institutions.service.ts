import { axiosInstance } from '@/api/axiosInstance';

export const educationalInstitutionsService = {
  findAll: async () => {
    const response = await axiosInstance.get('educational-institutions');
    return response.data;
  },
  create: async (educationalInstitution: Record<string, any>) => {
    const response = await axiosInstance.post('educational-institutions', educationalInstitution);
    return response.data;
  },
  update: async (id: string, educationalInstitution: Record<string, any>) => {
    const response = await axiosInstance.patch(`educational-institutions/${id}`, educationalInstitution);
    return response.data;
  },
  delete: async (id: string) => {
    await axiosInstance.delete(`educational-institutions/${id}`);
  },
  restore: async (id: string) => {
    await axiosInstance.post(`educational-institutions/${id}/restore`);
  }
};
