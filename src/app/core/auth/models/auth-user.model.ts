export interface AuthUser {
  id: number;
  nombre: string;
  sucursal_id?: number;
  apellido_paterno?: string;
  apellido_materno?: string;
  email?: string;
  username?: string;
}
