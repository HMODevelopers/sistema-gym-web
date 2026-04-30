import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const AUTH_TOKEN_KEY = 'sistema_gym_auth_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly router: Router) {}

  login(username: string, password: string): boolean {
    if (!username.trim() || !password.trim()) {
      return false;
    }

    this.setToken('placeholder-token');
    return true;
  }

  logout(): void {
    this.removeToken();
    void this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  removeToken(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}
