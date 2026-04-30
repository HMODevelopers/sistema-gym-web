import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { API_BASE_URL } from '../../config/api.config';
import { AuthLoginRequest } from '../models/auth-login-request.model';
import { AuthLoginResponse } from '../models/auth-login-response.model';
import { AuthSession } from '../models/auth-session.model';
import { AuthUser } from '../models/auth-user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authTokenKey = 'sistema_gym_auth_token';
  private readonly authSessionKey = 'sistema_gym_auth_session';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {}

  login(credentials: AuthLoginRequest): Observable<AuthSession> {
    return this.http.post<AuthLoginResponse>(`${API_BASE_URL}/auth/login`, credentials).pipe(
      map((response) => this.mapSession(response)),
      tap((session) => this.setSession(session)),
    );
  }

  logout(): void {
    this.clearSession();
    void this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  getCurrentUser(): AuthUser | null {
    return this.getSession()?.user ?? null;
  }

  getSession(): AuthSession | null {
    const sessionString = localStorage.getItem(this.authSessionKey);
    if (!sessionString) {
      return null;
    }

    try {
      return JSON.parse(sessionString) as AuthSession;
    } catch {
      this.clearSession();
      return null;
    }
  }

  setSession(session: AuthSession): void {
    localStorage.setItem(this.authTokenKey, session.token);
    localStorage.setItem(this.authSessionKey, JSON.stringify(session));
  }

  clearSession(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.authSessionKey);
  }

  hasPermission(permission: string): boolean {
    const session = this.getSession();
    return !!session?.permisos.includes(permission);
  }

  hasAnyPermission(permissions: string[]): boolean {
    const session = this.getSession();
    if (!session) {
      return false;
    }
    return permissions.some((permission) => session.permisos.includes(permission));
  }

  hasRole(role: string): boolean {
    const session = this.getSession();
    return !!session?.roles.includes(role);
  }

  private mapSession(response: AuthLoginResponse): AuthSession {
    const userRoles = response.user.roles ?? [];
    const userPermisos = response.user.permisos ?? [];

    return {
      token: response.token,
      user: response.user,
      roles: response.roles ?? userRoles,
      permisos: response.permisos ?? userPermisos,
    };
  }
}
