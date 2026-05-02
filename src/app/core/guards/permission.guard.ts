import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const permissionGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  const permissions = (route.data?.['permissions'] as string[] | undefined) ?? [];
  const requireAllPermissions = Boolean(route.data?.['requireAllPermissions']);

  if (!permissions.length) {
    return true;
  }

  const isAuthorized = requireAllPermissions
    ? authService.hasAllPermissions(permissions)
    : authService.hasAnyPermission(permissions);

  if (isAuthorized) {
    return true;
  }

  if (state.url === '/403') {
    return true;
  }

  return router.createUrlTree(['/403']);
};
