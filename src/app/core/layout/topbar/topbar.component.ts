import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
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
        <button
          type="button"
          (click)="toggleSidebar()"
          class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition hover:border-violet-400/70 hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 dark:border-white/20 dark:bg-slate-800/85 dark:text-slate-200 dark:hover:border-violet-300/70 dark:hover:bg-slate-700/80"
          [attr.aria-label]="sidebarAriaLabel"
        >
          <svg class="h-5 w-5 transition-transform duration-200" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path [attr.d]="sidebarIconPath" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <div class="relative z-30 flex items-center gap-2 sm:gap-3">
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
              <span class="block text-xs text-slate-500 dark:text-slate-300">{{ userSecondary }}</span>
            </span>
            <svg class="h-4 w-4 text-slate-500 dark:text-slate-300" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.512a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </button>

          @if (isUserMenuOpen) {
            <div class="absolute right-0 top-full z-[70] mt-3 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl ring-1 ring-black/5 dark:border-white/10 dark:bg-slate-950 dark:shadow-2xl dark:ring-white/10" role="menu">
              <div class="border-b border-slate-200 p-4 dark:border-white/10">
                <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">{{ userDisplayName }}</p>
                <p class="truncate text-xs text-slate-500 dark:text-slate-400">{{ userSecondary }}</p>
              </div>
              <div class="p-2">
                <button
                  type="button"
                  (click)="placeholderAction('Mi perfil')"
                  class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5"
                  role="menuitem"
                >
                  Mi perfil
                </button>
                <button
                  type="button"
                  (click)="placeholderAction('Configuración')"
                  class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5"
                  role="menuitem"
                >
                  Configuración
                </button>
                <button
                  type="button"
                  (click)="placeholderAction('Cambiar contraseña')"
                  class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5"
                  role="menuitem"
                >
                  Cambiar contraseña
                </button>
                <div class="my-2 border-t border-slate-200 dark:border-white/10"></div>
                <button
                  type="button"
                  (click)="logout()"
                  class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                  role="menuitem"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </header>
  `,
})
export class TopbarComponent {
  @Input() sidebarCollapsed = false;
  @Input() mobileSidebarOpen = false;
  @Input() isDesktop = true;
  @Output() sidebarToggle = new EventEmitter<void>();
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


  get sidebarAriaLabel(): string {
    if (this.isDesktop) {
      return this.sidebarCollapsed ? 'Expandir navegación' : 'Colapsar navegación';
    }

    return this.mobileSidebarOpen ? 'Cerrar navegación' : 'Abrir navegación';
  }

  get sidebarIconPath(): string {
    if (this.isDesktop) {
      return this.sidebarCollapsed ? 'M7.5 4.5L13 10l-5.5 5.5' : 'M12.5 4.5L7 10l5.5 5.5';
    }

    return this.mobileSidebarOpen ? 'M6 6l8 8M14 6l-8 8' : 'M7 5l6 5-6 5';
  }
  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleSidebar(): void {
    this.sidebarToggle.emit();
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
