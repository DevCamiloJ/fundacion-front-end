import { AxiosError } from 'axios'
import { useQuery } from 'react-query'

import { authService } from '../services/auth.service'
import { User } from '../types/user'

// Hook para verificar si el token JWT es válido
export const useVerifyToken = () => {
  return useQuery<User, AxiosError>({
    queryKey: ["currentUser"],
    queryFn: authService.verifyToken,
    retry: 1,
    refetchOnWindowFocus: false,
    onError: () => {
      localStorage.removeItem("token"); // Eliminar el token si es inválido
    },
  });
}