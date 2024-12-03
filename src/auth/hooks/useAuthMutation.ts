import { AxiosError } from 'axios'
import { useMutation } from 'react-query'

import { authService } from '../services/auth.service'
import { LoginResponse } from '../types/loginResponse'
import { LoginFormValues } from '../schemas/loginSchema'

export const useAuthMutation = () => {
  return useMutation<LoginResponse, AxiosError, LoginFormValues>(authService.login);
}
