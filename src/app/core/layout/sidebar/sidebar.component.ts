import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { SidebarIconComponent, SidebarIconName } from './sidebar-icon.component';

interface BaseNav {
  label: string;
  icon: SidebarIconName;
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

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, SidebarIconComponent],
  template: `
    <aside class="relative flex h-screen flex-col border-r border-slate-200 bg-gradient-to-b from-white via-violet-50 to-indigo-100 text-slate-800 transition-[width] duration-300 dark:border-white/10 dark:from-slate-950 dark:via-indigo-950 dark:to-violet-950/95 dark:text-slate-100" [class.w-72]="!collapsed" [class.w-20]="collapsed">
      <div class="border-b border-slate-200 px-3 py-4 dark:border-white/10">
        <div class="flex h-12 items-center" [class.justify-center]="collapsed" [class.justify-between]="!collapsed">
          <div class="flex min-w-0 items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 ring-1 ring-violet-300/30">
            <span class="text-sm font-bold text-violet-700 dark:text-violet-200">SG</span>
          </div>
    
            @if (!collapsed) {
              <div class="min-w-0">
              <p class="truncate text-base font-semibold tracking-wide text-slate-900 dark:text-white">Sistema Gym</p>
              <p class="text-xs text-slate-600 dark:text-slate-300">Panel administrativo</p>
            </div>
            }
          </div>
        </div>
      </div>

      @if (!collapsed) {
        <div class="px-4 pb-4 pt-5">
          <p class="px-3 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">Navegación principal</p>
        </div>
      }

      <nav class="flex-1 space-y-2 overflow-y-auto px-3 pb-6 pt-4" [class.pt-5]="!collapsed">
        @for (entry of navEntries; track entry.label) {
          @if (entry.type === 'item') {
            <a [routerLink]="entry.path" class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition" [class.justify-center]="collapsed" [attr.title]="collapsed ? entry.label : null"
              [class]="isExactRouteActive(entry.path)
                ? 'bg-violet-500/15 text-violet-800 shadow-[inset_0_0_0_1px_rgba(124,58,237,0.3)] dark:bg-violet-500/20 dark:text-violet-100 dark:shadow-[inset_0_0_0_1px_rgba(167,139,250,0.45)]'
                : 'text-slate-700 hover:bg-violet-500/10 hover:text-violet-700 dark:text-slate-200 dark:hover:bg-violet-500/10 dark:hover:text-violet-100'">
              <span class="shrink-0 text-current"><app-sidebar-icon [icon]="entry.icon"></app-sidebar-icon></span>
              @if (!collapsed) { <span>{{ entry.label }}</span> }
            </a>
          } @else {
            <section class="space-y-1">
              <button type="button" (click)="toggleGroup(entry.key)" class="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition" [class.justify-center]="collapsed" [attr.title]="collapsed ? entry.label : null"
                [class]="isGroupHighlighted(entry)
                  ? 'text-violet-800 bg-violet-500/8 dark:text-violet-100 dark:bg-violet-400/8'
                  : 'text-slate-700 hover:bg-violet-500/10 hover:text-violet-700 dark:text-slate-200 dark:hover:bg-violet-500/10 dark:hover:text-violet-100'">
                <span class="shrink-0 text-current"><app-sidebar-icon [icon]="entry.icon"></app-sidebar-icon></span>
                @if (!collapsed) {
                  <span class="flex-1">{{ entry.label }}</span>
                  <svg class="h-4 w-4 text-current transition-transform duration-200" [class.rotate-90]="isGroupExpanded(entry.key)" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
                    <path d="M7 4l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                }
              </button>

              @if (!collapsed) {
                <div [class.hidden]="!isGroupExpanded(entry.key)" class="space-y-1 pl-11">
                  @for (child of entry.children; track child.path) {
                    <a [routerLink]="child.path" class="block border-l-2 px-3 py-2 text-sm transition"
                      [class]="isExactRouteActive(child.path)
                        ? 'border-violet-400 bg-violet-500/5 text-slate-900 dark:border-violet-300 dark:bg-violet-400/10 dark:text-slate-100'
                        : 'border-transparent text-slate-600 hover:border-violet-300/70 hover:text-violet-700 dark:text-slate-300 dark:hover:border-violet-300/70 dark:hover:text-violet-100'">
                      {{ child.label }}
                    </a>
                  }
                </div>
              }
            </section>
          }
        }
      </nav>
    </aside>
  `,
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();

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

  ngOnInit(): void { this.expandedGroups = this.readStoredGroups(); this.ensureRouteGroupOpen(this.router.url); this.subscription.add(this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe((event) => this.ensureRouteGroupOpen(event.urlAfterRedirects))); }
  ngOnDestroy(): void { this.subscription.unsubscribe(); }
  toggleCollapsed(): void { this.collapsedChange.emit(!this.collapsed); }
  toggleGroup(groupKey: string): void {
    const shouldOpen = !this.expandedGroups[groupKey];
    this.expandedGroups = shouldOpen ? this.createSingleOpenState(groupKey) : {};
    this.persistExpandedGroups();
  }
  isGroupExpanded(groupKey: string): boolean { return Boolean(this.expandedGroups[groupKey]); }
  isGroupHighlighted(group: NavGroup): boolean { return this.isGroupExpanded(group.key) || this.isGroupRouteActive(group); }
  isExactRouteActive(path: string): boolean { return this.router.isActive(path, { paths: 'exact', queryParams: 'ignored', fragment: 'ignored', matrixParams: 'ignored' }); }
  private isGroupRouteActive(group: NavGroup): boolean { return group.children.some((child) => this.isExactRouteActive(child.path)); }
  private ensureRouteGroupOpen(url: string): void {
    const activeGroupKey = this.findGroupByUrl(url)?.key;
    this.expandedGroups = activeGroupKey ? this.createSingleOpenState(activeGroupKey) : {};
    this.persistExpandedGroups();
  }
  private isPathInUrl(path: string, url: string): boolean { return url === path || url.startsWith(`${path}/`) || url.startsWith(`${path}?`); }
  private findGroupByUrl(url: string): NavGroup | undefined {
    return this.navEntries.find((entry): entry is NavGroup =>
      entry.type === 'group' && entry.children.some((child) => this.isPathInUrl(child.path, url)),
    );
  }
  private createSingleOpenState(groupKey: string): Record<string, boolean> { return { [groupKey]: true }; }
  private readStoredGroups(): Record<string, boolean> {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return {};
    try {
      const parsed = JSON.parse(raw) as Record<string, boolean>;
      const openGroup = Object.entries(parsed).find(([, isOpen]) => isOpen)?.[0];
      return openGroup ? this.createSingleOpenState(openGroup) : {};
    } catch {
      return {};
    }
  }
  private persistExpandedGroups(): void { localStorage.setItem(this.storageKey, JSON.stringify(this.expandedGroups)); }

}
