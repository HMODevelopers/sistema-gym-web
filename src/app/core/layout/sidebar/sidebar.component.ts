import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem { label: string; path: string }

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="w-72 bg-slate-900 text-slate-100">
      <div class="border-b border-slate-800 px-6 py-5">
        <p class="text-lg font-semibold">Sistema Gym</p>
        <p class="text-xs text-slate-400">Navegación principal</p>
      </div>
      <nav class="space-y-1 p-4">
        @for (item of navItems; track item.path) {
          <a
            [routerLink]="item.path"
            routerLinkActive="bg-slate-700 text-white"
            class="block rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
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
