import { AuthUser } from './auth-user.model';

export interface AuthLoginResponse {
  message?: string;
  token: string;
  user: AuthUser;
  roles?: string[];
  permisos?: string[];
}
