import { User } from './user';

export interface LoginResponse {
  user:         User;
  access_token: string;
}