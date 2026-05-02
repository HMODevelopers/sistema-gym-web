import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthLoginRequest } from '../models/auth-login-request.model';
import { AuthLoginResponse } from '../models/auth-login-response.model';
import { AuthSession } from '../models/auth-session.model';
import { AuthUser } from '../models/auth-user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authTokenKey = 'sistema_gym_token';
  private readonly authUserKey = 'sistema_gym_user';
  private readonly authRolesKey = 'sistema_gym_roles';
  private readonly authPermisosKey = 'sistema_gym_permisos';
  private readonly authSessionKey = 'sistema_gym_session';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {}

  login(credentials: AuthLoginRequest): Observable<AuthSession> {
    return this.http.post<AuthLoginResponse>(`${environment.apiUrl}/auth/login`, credentials).pipe(
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
    localStorage.setItem(this.authUserKey, JSON.stringify(session.user));
    localStorage.setItem(this.authRolesKey, JSON.stringify(session.roles));
    localStorage.setItem(this.authPermisosKey, JSON.stringify(session.permisos));
    localStorage.setItem(this.authSessionKey, JSON.stringify(session));
  }

  clearSession(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.authUserKey);
    localStorage.removeItem(this.authRolesKey);
    localStorage.removeItem(this.authPermisosKey);
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
    const token = response.data?.token?.trim();
    if (!token) {
      throw new Error('La respuesta de autenticación no incluye token.');
    }

    return {
      token,
      user: response.data.usuario,
      roles: response.data.roles ?? [],
      permisos: response.data.permisos ?? [],
    };
  }
}
