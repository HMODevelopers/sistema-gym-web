export interface AuthSession {
  token: string;
  user?: {
    name: string;
    email?: string;
  };
}
