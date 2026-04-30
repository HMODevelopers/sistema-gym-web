import { AuthUser } from './auth-user.model';

export interface AuthSession {
  token: string;
  user: AuthUser;
  roles: string[];
  permisos: string[];
}
