import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  template: `
    <header class="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <p class="text-lg font-semibold text-slate-900">Sistema Gym</p>
        <p class="text-xs text-slate-500">Panel administrativo</p>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm text-slate-600">{{ userDisplayName }}</span>
        <button
          type="button"
          (click)="logout()"
          class="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  `,
})
export class TopbarComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
  ) {}

  get userDisplayName(): string {
    return this.authService.getCurrentUser()?.nombre || 'Administrador';
  }

  logout(): void {
    this.authService.logout();
    this.toastService.info('Sesión cerrada correctamente.');
  }
}
