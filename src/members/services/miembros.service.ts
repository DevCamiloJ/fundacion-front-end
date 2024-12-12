import { axiosInstance } from '@/api/axiosInstance';

export const membersService = {
  findAll: async () => {
    const response = await axiosInstance.get("members");
    return response.data;
  },
  create: async (member: Record<string, any>) => {
    const response = await axiosInstance.post("members", member);
    return response.data;
  },
  update: async (id: string, member: Record<string, any>) => {
    const response = await axiosInstance.patch(`members/${id}`, member);
    return response.data;
  },
  inactivate: async (id: string) => {
    await axiosInstance.patch(`members/inactivate/${id}`);
  },
};
