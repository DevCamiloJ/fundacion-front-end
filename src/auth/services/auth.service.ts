import { axiosInstance } from '@/api/axiosInstance';
import { LoginFormValues } from '../schemas/loginSchema';

export const authService = {
  login: async (data: LoginFormValues) => {
    const response = await axiosInstance.post("auth/login", data);
    return response.data;
  },

  // Método para verificar si el token es válido (por ejemplo, con un endpoint /me)
  verifyToken: async () => {
    const response = await axiosInstance.get("auth/profile"); 
    return response.data;
  },
};
