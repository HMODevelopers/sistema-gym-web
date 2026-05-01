import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent],
  template: `
    <div class="relative flex min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -left-20 top-0 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl"></div>
        <div class="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl"></div>
      </div>

      @if (!isDesktop && mobileSidebarOpen) {
        <button
          type="button"
          class="fixed inset-0 z-40 bg-black/50 lg:hidden"
          (click)="closeMobileSidebar()"
          aria-label="Cerrar navegación"
        ></button>
      }

      <app-sidebar
        class="relative"
        [collapsed]="sidebarCollapsed"
        [isDesktop]="isDesktop"
        [mobileOpen]="mobileSidebarOpen"
        (collapsedChange)="setSidebarCollapsed($event)"
        (menuNavigate)="handleMenuNavigate()"
      />

      <div class="relative z-0 flex min-w-0 flex-1 flex-col">
        <app-topbar
          [isDesktop]="isDesktop"
          [sidebarCollapsed]="sidebarCollapsed"
          [mobileSidebarOpen]="mobileSidebarOpen"
          (sidebarToggle)="onSidebarToggle()"
        />

        <main class="flex-1 px-4 pb-6 pt-5 md:px-6 md:pt-6 lg:px-8 xl:px-10 2xl:px-12">
          <div class="w-full">
            <router-outlet />
          </div>
        </main>

        <footer class="border-t border-slate-200 bg-white/80 dark:border-white/10 dark:bg-slate-900/70 px-4 py-4 backdrop-blur md:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div class="flex w-full flex-col gap-3 text-xs text-slate-600 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p class="font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-200">SYS GYM</p>
              <p class="mt-1">Sistema administrativo para operación de gimnasio.</p>
            </div>
            <div class="text-left sm:text-right">
              <p>Versión 1.0.0 · © 2026</p>
              <p class="mt-1">HMO Developers.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  `,
})
export class AppLayoutComponent implements OnInit {
  private readonly sidebarStorageKey = 'sistema_gym_sidebar_collapsed';
  sidebarCollapsed = this.readSidebarCollapsed();
  mobileSidebarOpen = false;
  isDesktop = false;

  ngOnInit(): void {
    this.syncViewportMode();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.syncViewportMode();
  }

  onSidebarToggle(): void {
    if (this.isDesktop) {
      this.setSidebarCollapsed(!this.sidebarCollapsed);
      return;
    }

    this.mobileSidebarOpen = !this.mobileSidebarOpen;
  }

  closeMobileSidebar(): void {
    this.mobileSidebarOpen = false;
  }

  handleMenuNavigate(): void {
    if (!this.isDesktop) {
      this.mobileSidebarOpen = false;
    }
  }

  setSidebarCollapsed(collapsed: boolean): void {
    this.sidebarCollapsed = collapsed;
    localStorage.setItem(this.sidebarStorageKey, JSON.stringify(collapsed));
  }

  private syncViewportMode(): void {
    this.isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (this.isDesktop) {
      this.mobileSidebarOpen = false;
    }
  }

  private readSidebarCollapsed(): boolean {
    const raw = localStorage.getItem(this.sidebarStorageKey);
    return raw ? raw === 'true' : false;
  }
}
