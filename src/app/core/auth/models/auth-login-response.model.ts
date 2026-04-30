import { AuthUser } from './auth-user.model';

export interface AuthLoginResponse {
  message: string;
  data: {
    usuario: AuthUser;
    roles: string[];
    permisos: string[];
    token: string;
  };
}
