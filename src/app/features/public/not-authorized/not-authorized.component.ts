import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-authorized',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
      <section class="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300">Error 403</p>
        <h1 class="mt-3 text-2xl font-bold text-slate-900 dark:text-white">Acceso no autorizado</h1>
        <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">No tienes permisos para acceder a esta sección.</p>
        <a
          routerLink="/dashboard"
          class="mt-6 inline-flex items-center justify-center rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
        >
          Volver al dashboard
        </a>
      </section>
    </main>
  `,
})
export class NotAuthorizedComponent {}
