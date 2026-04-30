export interface AuthUser {
  id: number;
  nombre: string;
  email: string;
  username?: string;
  roles?: string[];
  permisos?: string[];
}
