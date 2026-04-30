import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';

interface BaseNav {
  label: string;
  icon: SidebarIcon;
}

interface NavItem extends BaseNav {
  type: 'item';
  path: string;
}

interface NavGroup extends BaseNav {
  type: 'group';
  key: string;
  children: Array<Omit<NavItem, 'type' | 'icon'> & { path: string; label: string }>;
}

type NavEntry = NavItem | NavGroup;
type SidebarIcon = 'dashboard' | 'operacion' | 'comercial' | 'catalogos' | 'administracion' | 'analisis';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <aside class="flex h-screen w-72 flex-col border-r border-slate-200 bg-gradient-to-b from-white via-violet-50 to-indigo-100 text-slate-800 dark:border-white/10 dark:from-slate-950 dark:via-indigo-950 dark:to-violet-950/95 dark:text-slate-100">
      <div class="border-b border-slate-200 px-6 py-6 dark:border-white/10">
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

      <nav class="flex-1 space-y-2 overflow-y-auto px-4 pb-6">
        @for (entry of navEntries; track entry.label) {
          @if (entry.type === 'item') {
            <a
              [routerLink]="entry.path"
              class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition"
              [class]="isExactRouteActive(entry.path)
                ? 'bg-violet-500/15 text-violet-800 shadow-[inset_0_0_0_1px_rgba(124,58,237,0.3)] dark:bg-violet-500/20 dark:text-violet-100 dark:shadow-[inset_0_0_0_1px_rgba(167,139,250,0.45)]'
                : 'text-slate-700 hover:bg-violet-500/10 hover:text-violet-700 dark:text-slate-200 dark:hover:bg-violet-500/10 dark:hover:text-violet-100'"
            >
              <span class="h-5 w-5" [innerHTML]="getIcon(entry.icon)"></span>
              <span>{{ entry.label }}</span>
            </a>
          } @else {
            <section class="space-y-1">
              <button
                type="button"
                (click)="toggleGroup(entry.key)"
                class="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition"
                [class]="isGroupHighlighted(entry)
                  ? 'bg-violet-500/12 text-violet-800 shadow-[inset_0_0_0_1px_rgba(124,58,237,0.2)] dark:bg-violet-500/18 dark:text-violet-100 dark:shadow-[inset_0_0_0_1px_rgba(167,139,250,0.35)]'
                  : 'text-slate-700 hover:bg-violet-500/10 hover:text-violet-700 dark:text-slate-200 dark:hover:bg-violet-500/10 dark:hover:text-violet-100'"
              >
                <span class="h-5 w-5" [innerHTML]="getIcon(entry.icon)"></span>
                <span class="flex-1">{{ entry.label }}</span>
                <svg
                  class="h-4 w-4 text-current transition-transform duration-200"
                  [class.rotate-90]="isGroupExpanded(entry.key)"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path d="M7 4l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>

              <div [class.hidden]="!isGroupExpanded(entry.key)" class="space-y-1 pl-11">
                @for (child of entry.children; track child.path) {
                  <a
                    [routerLink]="child.path"
                    class="block rounded-lg border-l-2 px-3 py-2 text-sm transition"
                    [class]="isExactRouteActive(child.path)
                      ? 'border-violet-400 bg-violet-500/18 text-violet-900 dark:border-violet-300 dark:bg-violet-500/22 dark:text-violet-100'
                      : 'border-transparent text-slate-600 hover:border-violet-300/60 hover:bg-violet-500/10 hover:text-violet-700 dark:text-slate-300 dark:hover:border-violet-300/60 dark:hover:bg-violet-500/10 dark:hover:text-violet-100'"
                  >
                    {{ child.label }}
                  </a>
                }
              </div>
            </section>
          }
        }
      </nav>
    </aside>
  `,
})
export class SidebarComponent implements OnInit, OnDestroy {
  private readonly storageKey = 'sg-sidebar-open-groups';
  private readonly subscription = new Subscription();

  readonly navEntries: NavEntry[] = [
    { type: 'item', label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    {
      type: 'group',
      key: 'operacion',
      label: 'Operación',
      icon: 'operacion',
      children: [
        { label: 'Recepción', path: '/recepcion' },
        { label: 'Accesos', path: '/accesos' },
      ],
    },
    {
      type: 'group',
      key: 'comercial',
      label: 'Comercial',
      icon: 'comercial',
      children: [
        { label: 'Clientes', path: '/clientes' },
        { label: 'Membresías', path: '/membresias' },
        { label: 'Pagos', path: '/pagos' },
      ],
    },
    {
      type: 'group',
      key: 'catalogos',
      label: 'Catálogos',
      icon: 'catalogos',
      children: [
        { label: 'Planes', path: '/planes' },
        { label: 'Sucursales', path: '/sucursales' },
      ],
    },
    {
      type: 'group',
      key: 'administracion',
      label: 'Administración',
      icon: 'administracion',
      children: [
        { label: 'Usuarios', path: '/usuarios' },
        { label: 'Roles', path: '/roles' },
      ],
    },
    {
      type: 'group',
      key: 'analisis',
      label: 'Análisis',
      icon: 'analisis',
      children: [{ label: 'Reportes', path: '/reportes' }],
    },
  ];

  expandedGroups: Record<string, boolean> = {};

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.expandedGroups = this.readStoredGroups();
    this.ensureRouteGroupOpen(this.router.url);

    this.subscription.add(
      this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe((event) => this.ensureRouteGroupOpen(event.urlAfterRedirects)),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleGroup(groupKey: string): void {
    this.expandedGroups[groupKey] = !this.expandedGroups[groupKey];
    this.persistExpandedGroups();
  }

  isGroupExpanded(groupKey: string): boolean {
    return Boolean(this.expandedGroups[groupKey]);
  }

  isGroupHighlighted(group: NavGroup): boolean {
    return this.isGroupExpanded(group.key) || this.isGroupRouteActive(group);
  }

  isExactRouteActive(path: string): boolean {
    return this.router.isActive(path, {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  private isGroupRouteActive(group: NavGroup): boolean {
    return group.children.some((child) => this.isExactRouteActive(child.path));
  }

  private ensureRouteGroupOpen(url: string): void {
    for (const entry of this.navEntries) {
      if (entry.type !== 'group') {
        continue;
      }

      const hasActiveChild = entry.children.some((child) => this.isPathInUrl(child.path, url));
      if (hasActiveChild) {
        this.expandedGroups[entry.key] = true;
      }
    }

    this.persistExpandedGroups();
  }

  private isPathInUrl(path: string, url: string): boolean {
    return url === path || url.startsWith(`${path}/`) || url.startsWith(`${path}?`);
  }

  private readStoredGroups(): Record<string, boolean> {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return {};
    }

    try {
      return JSON.parse(raw) as Record<string, boolean>;
    } catch {
      return {};
    }
  }

  private persistExpandedGroups(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.expandedGroups));
  }

  getIcon(icon: SidebarIcon): string {
    const classes = 'h-5 w-5';

    switch (icon) {
      case 'dashboard':
        return `<svg class="${classes}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5.5h7v5H4zM13 5.5h7v8h-7zM4 12.5h7v6H4zM13 16.5h7v2h-7z" stroke-linejoin="round"/></svg>`;
      case 'operacion':
        return `<svg class="${classes}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 12h16M12 4l4 8-4 8-4-8 4-8z" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      case 'comercial':
        return `<svg class="${classes}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 8h16v11H4z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></svg>`;
      case 'catalogos':
        return `<svg class="${classes}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 4h12v16H6z"/><path d="M9 8h6M9 12h6M9 16h4" stroke-linecap="round"/></svg>`;
      case 'administracion':
        return `<svg class="${classes}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l2.1 2.4 3.2-.2.9 3.1 2.8 1.6-1.5 2.8 1.5 2.8-2.8 1.6-.9 3.1-3.2-.2L12 21l-2.1-2.4-3.2.2-.9-3.1-2.8-1.6 1.5-2.8-1.5-2.8 2.8-1.6.9-3.1 3.2.2z"/><circle cx="12" cy="12" r="3"/></svg>`;
      case 'analisis':
        return `<svg class="${classes}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 19V5M5 19h14" stroke-linecap="round"/><path d="M8 15l3-4 3 2 4-6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    }
  }
}
