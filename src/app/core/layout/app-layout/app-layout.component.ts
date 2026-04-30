import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent],
  template: `
    <div class="relative flex min-h-screen bg-slate-950 text-slate-100">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -left-20 top-0 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl"></div>
        <div class="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl"></div>
      </div>

      <div class="relative hidden md:block">
        <app-sidebar />
      </div>

      <div class="relative flex min-w-0 flex-1 flex-col">
        <app-topbar />

        <main class="flex-1 px-4 pb-6 pt-5 md:px-6 md:pt-6 lg:px-8">
          <div class="mx-auto w-full max-w-7xl">
            <router-outlet />
          </div>
        </main>

        <footer class="border-t border-white/10 bg-slate-900/70 px-4 py-4 backdrop-blur md:px-6 lg:px-8">
          <div class="mx-auto flex w-full max-w-7xl flex-col gap-3 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p class="font-semibold uppercase tracking-wide text-slate-200">Sistema Gym</p>
              <p class="mt-1">Sistema administrativo para operación de gimnasio.</p>
            </div>
            <div class="text-left sm:text-right">
              <p>Versión 1.0.0 · © 2026</p>
              <p class="mt-1">Desarrollado para administración y control de acceso.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  `,
})
export class AppLayoutComponent {}
