import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="relative z-40 overflow-visible border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur dark:border-white/10 dark:bg-slate-900/65 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <div class="flex w-full items-center justify-between gap-4">
        <div>
          <p class="text-lg font-semibold text-slate-900 dark:text-white">Sistema Gym</p>
          <p class="text-xs text-slate-600 dark:text-slate-300">Gestión administrativa centralizada</p>
        </div>

        <div class="relative z-50 flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-violet-400/60 hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 dark:border-white/10 dark:bg-slate-800/85 dark:text-slate-200 dark:hover:bg-slate-700/80"
            (click)="toggleTheme()"
            [attr.aria-label]="themeToggleAriaLabel"
            [attr.title]="themeToggleTitle"
          >
            @if (isDarkMode) {
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2.2M12 19.8V22M4.93 4.93l1.55 1.55M17.52 17.52l1.55 1.55M2 12h2.2M19.8 12H22M4.93 19.07l1.55-1.55M17.52 6.48l1.55-1.55"></path>
              </svg>
            } @else {
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1111.21 3c0 .22-.01.43-.01.65A7 7 0 0020.35 13c.22 0 .43 0 .65-.01z"></path>
              </svg>
            }
          </button>

          <button
            type="button"
            class="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm text-slate-700 transition hover:border-violet-400/60 hover:bg-violet-50 dark:border-white/10 dark:bg-slate-800/85 dark:text-slate-200 dark:hover:bg-slate-700/80"
            (click)="toggleUserMenu()"
            aria-haspopup="menu"
            [attr.aria-expanded]="isUserMenuOpen"
          >
            <span class="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/35 to-indigo-500/35 ring-1 ring-violet-300/40">
              <svg viewBox="0 0 24 24" class="h-5 w-5 text-violet-700 dark:text-violet-100" fill="none" stroke="currentColor" stroke-width="1.8">
                <circle cx="12" cy="8" r="4"></circle>
                <path d="M4 20c1.8-3.5 4.7-5.2 8-5.2s6.2 1.7 8 5.2"></path>
              </svg>
            </span>
            <span class="hidden sm:block">
              <span class="block font-medium text-slate-900 dark:text-white">{{ userDisplayName }}</span>
              <span class="block text-xs text-slate-500 dark:text-slate-400">{{ userSecondary }}</span>
            </span>
            <svg class="h-4 w-4 text-slate-500 dark:text-slate-300" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.512a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </button>

          @if (isUserMenuOpen) {
            <div class="absolute right-0 z-[120] mt-2 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-2xl shadow-slate-300/40 dark:border-white/10 dark:bg-slate-900/95 dark:shadow-violet-900/40" role="menu">
              <div class="border-b border-slate-200 p-4 dark:border-white/10">
                <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ userDisplayName }}</p>
                <p class="truncate text-xs text-slate-500 dark:text-slate-400">{{ userSecondary }}</p>
              </div>
              <div class="p-2">
                <button type="button" (click)="placeholderAction('Mi perfil')" class="menu-item" role="menuitem">Mi perfil</button>
                <button type="button" (click)="placeholderAction('Configuración')" class="menu-item" role="menuitem">Configuración</button>
                <button type="button" (click)="placeholderAction('Cambiar contraseña')" class="menu-item" role="menuitem">Cambiar contraseña</button>
                <div class="my-2 border-t border-slate-200 dark:border-white/10"></div>
                <button type="button" (click)="logout()" class="menu-item text-rose-500 hover:bg-rose-500/10 dark:text-rose-300" role="menuitem">Cerrar sesión</button>
              </div>
            </div>
          }
        </div>
      </div>
    </header>
  `,
  styles: `
    .menu-item {
      @apply flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10;
    }
  `,
})
export class TopbarComponent {
  isUserMenuOpen = false;

  constructor(
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
    private readonly themeService: ThemeService,
    private readonly elementRef: ElementRef<HTMLElement>,
  ) {}

  get userDisplayName(): string {
    return this.authService.getCurrentUser()?.nombre || 'Administrador';
  }

  get userSecondary(): string {
    const user = this.authService.getCurrentUser();
    return user?.email || user?.username || 'admin@sistema.gym';
  }

  get isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  get themeToggleAriaLabel(): string {
    return this.isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro';
  }

  get themeToggleTitle(): string {
    return this.isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.toastService.info(`Tema ${this.themeService.getTheme() === 'dark' ? 'oscuro' : 'claro'} activado.`);
  }

  placeholderAction(option: string): void {
    this.isUserMenuOpen = false;
    this.toastService.info(`${option} estará disponible próximamente.`);
  }

  logout(): void {
    this.isUserMenuOpen = false;
    this.authService.logout();
    this.toastService.info('Sesión cerrada correctamente.');
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    if (!this.isUserMenuOpen) {
      return;
    }

    const target = event.target as Node | null;
    if (target && !this.elementRef.nativeElement.contains(target)) {
      this.isUserMenuOpen = false;
    }
  }
}
