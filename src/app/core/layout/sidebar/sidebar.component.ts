import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="flex h-screen w-72 flex-col border-r border-slate-200 bg-gradient-to-b from-white via-violet-50 to-indigo-100 text-slate-800 dark:border-white/10 dark:from-slate-950 dark:via-indigo-950 dark:to-violet-950/95 dark:text-slate-100">
      <div class="border-b border-slate-200 dark:border-white/10 px-6 py-6">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 ring-1 ring-violet-300/30">
            <span class="text-sm font-bold text-violet-700 dark:text-violet-200">SG</span>
          </div>
          <div>
            <p class="text-base font-semibold tracking-wide text-slate-900 dark:text-white">Sistema Gym</p>
            <p class="text-xs text-slate-600 dark:text-slate-300">Panel administrativo</p>
          </div>
        </div>
      </div>

      <div class="px-4 pb-4 pt-5">
        <p class="px-3 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">Navegación principal</p>
      </div>

      <nav class="flex-1 space-y-5 overflow-y-auto px-4 pb-6">
        @for (group of navGroups; track group.label) {
          <section class="space-y-1.5">
            <p class="px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{{ group.label }}</p>
            @for (item of group.items; track item.path) {
              <a
                [routerLink]="item.path"
                routerLinkActive="bg-violet-100 text-violet-700 shadow-[inset_0_0_0_1px_rgba(124,58,237,0.25)] dark:bg-violet-500/15 dark:text-slate-100 dark:shadow-[inset_0_0_0_1px_rgba(167,139,250,0.45)]"
                class="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-violet-100 hover:text-violet-700 dark:text-slate-200 dark:hover:bg-violet-500/10 dark:hover:text-white"
              >
                {{ item.label }}
              </a>
            }
          </section>
        }
      </nav>
    </aside>
  `,
})
export class SidebarComponent {
  readonly navGroups: NavGroup[] = [
    { label: 'Inicio', items: [{ label: 'Dashboard', path: '/dashboard' }] },
    {
      label: 'Operación',
      items: [
        { label: 'Recepción', path: '/recepcion' },
        { label: 'Accesos', path: '/accesos' },
      ],
    },
    {
      label: 'Comercial',
      items: [
        { label: 'Clientes', path: '/clientes' },
        { label: 'Membresías', path: '/membresias' },
        { label: 'Pagos', path: '/pagos' },
      ],
    },
    {
      label: 'Catálogos',
      items: [
        { label: 'Planes', path: '/planes' },
        { label: 'Sucursales', path: '/sucursales' },
      ],
    },
    {
      label: 'Administración',
      items: [
        { label: 'Usuarios', path: '/usuarios' },
        { label: 'Roles', path: '/roles' },
      ],
    },
    { label: 'Análisis', items: [{ label: 'Reportes', path: '/reportes' }] },
  ];
}
