import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="flex h-screen w-72 flex-col border-r border-white/10 bg-gradient-to-b from-slate-950 via-indigo-950 to-violet-950/95 text-slate-100">
      <div class="border-b border-white/10 px-6 py-6">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 ring-1 ring-violet-300/30">
            <span class="text-sm font-bold text-violet-200">SG</span>
          </div>
          <div>
            <p class="text-base font-semibold tracking-wide text-white">Sistema Gym</p>
            <p class="text-xs text-slate-300">Panel administrativo</p>
          </div>
        </div>
      </div>

      <div class="px-4 pb-4 pt-5">
        <p class="px-3 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">Navegación principal</p>
      </div>

      <nav class="flex-1 space-y-1 overflow-y-auto px-4 pb-6">
        @for (item of navItems; track item.path) {
          <a
            [routerLink]="item.path"
            routerLinkActive="bg-white/12 text-white shadow-[inset_0_0_0_1px_rgba(167,139,250,0.45)]"
            class="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
          >
            {{ item.label }}
          </a>
        }
      </nav>
    </aside>
  `,
})
export class SidebarComponent {
  readonly navItems: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Recepción', path: '/recepcion' },
    { label: 'Clientes', path: '/clientes' },
    { label: 'Planes', path: '/planes' },
    { label: 'Membresías', path: '/membresias' },
    { label: 'Pagos', path: '/pagos' },
    { label: 'Accesos', path: '/accesos' },
    { label: 'Reportes', path: '/reportes' },
    { label: 'Usuarios', path: '/usuarios' },
    { label: 'Roles', path: '/roles' },
    { label: 'Sucursales', path: '/sucursales' },
  ];
}
