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
    const sessionFromStorage = this.parseSession(localStorage.getItem(this.authSessionKey));
    if (sessionFromStorage) {
      return sessionFromStorage;
    }

    const token = localStorage.getItem(this.authTokenKey)?.trim();
    const user = this.parseJson<AuthUser>(localStorage.getItem(this.authUserKey));
    const roles = this.parseArray(localStorage.getItem(this.authRolesKey));
    const permissions = this.parseArray(localStorage.getItem(this.authPermisosKey));

    if (!token || !user) {
      return null;
    }

    const fallbackSession: AuthSession = {
      token,
      user,
      roles,
      permissions,
    };

    this.setSession(fallbackSession);
    return fallbackSession;
  }

  getRoles(): string[] {
    return this.getSession()?.roles ?? [];
  }

  getPermissions(): string[] {
    return this.getSession()?.permissions ?? [];
  }

  setSession(session: AuthSession): void {
    localStorage.setItem(this.authTokenKey, session.token);
    localStorage.setItem(this.authUserKey, JSON.stringify(session.user));
    localStorage.setItem(this.authRolesKey, JSON.stringify(session.roles));
    localStorage.setItem(this.authPermisosKey, JSON.stringify(session.permissions));
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
    return this.getPermissions().includes(permission);
  }

  hasAnyPermission(permissions: string[]): boolean {
    const sessionPermissions = this.getPermissions();
    return permissions.some((permission) => sessionPermissions.includes(permission));
  }

  hasAllPermissions(permissions: string[]): boolean {
    const sessionPermissions = this.getPermissions();
    return permissions.every((permission) => sessionPermissions.includes(permission));
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    const sessionRoles = this.getRoles();
    return roles.some((role) => sessionRoles.includes(role));
  }

  private mapSession(response: AuthLoginResponse): AuthSession {
    const data = response.data;
    const token = data?.token?.trim();

    if (!token) {
      throw new Error('La respuesta de autenticación no incluye token.');
    }

    return {
      token,
      user: data.usuario,
      roles: data.auth?.roles ?? data.roles ?? [],
      permissions: data.auth?.permisos ?? [],
    };
  }

  private parseSession(rawSession: string | null): AuthSession | null {
    const parsed = this.parseJson<AuthSession>(rawSession);
    if (!parsed?.token || !parsed.user) {
      if (rawSession) {
        this.clearSession();
      }
      return null;
    }

    return {
      token: parsed.token,
      user: parsed.user,
      roles: Array.isArray(parsed.roles) ? parsed.roles : [],
      permissions: Array.isArray(parsed.permissions) ? parsed.permissions : [],
    };
  }

  private parseJson<T>(value: string | null): T | null {
    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }

  private parseArray(value: string | null): string[] {
    const parsed = this.parseJson<unknown>(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  }
}
