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
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
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
  activeFlyoutKey: string | null = null;

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

  toggleCollapsed(): void {
    this.collapsedChange.emit(!this.collapsed);
  }

  toggleGroup(groupKey: string): void {
    if (this.collapsed) {
      this.toggleFlyout(groupKey);
      return;
    }

    const shouldOpen = !this.expandedGroups[groupKey];
    this.expandedGroups = shouldOpen ? this.createSingleOpenState(groupKey) : {};
    this.persistExpandedGroups();
  }

  openFlyout(groupKey: string): void {
    if (!this.collapsed) return;
    this.activeFlyoutKey = groupKey;
  }

  closeFlyout(): void {
    this.activeFlyoutKey = null;
  }

  toggleFlyout(groupKey: string): void {
    if (!this.collapsed) return;
    this.activeFlyoutKey = this.activeFlyoutKey === groupKey ? null : groupKey;
  }

  isFlyoutGroupOpen(groupKey: string): boolean {
    return this.collapsed && this.activeFlyoutKey === groupKey;
  }

  closeFlyoutAfterNavigation(): void {
    this.closeFlyout();
  }

  isGroupExpanded(groupKey: string): boolean {
    return Boolean(this.expandedGroups[groupKey]);
  }

  isGroupHighlighted(group: NavGroup): boolean {
    return this.isGroupExpanded(group.key) || this.isGroupRouteActive(group);
  }

  isExactRouteActive(path: string): boolean {
    return this.router.isActive(path, { paths: 'exact', queryParams: 'ignored', fragment: 'ignored', matrixParams: 'ignored' });
  }

  private isGroupRouteActive(group: NavGroup): boolean {
    return group.children.some((child) => this.isExactRouteActive(child.path));
  }

  private ensureRouteGroupOpen(url: string): void {
    const activeGroupKey = this.findGroupByUrl(url)?.key;
    this.expandedGroups = activeGroupKey ? this.createSingleOpenState(activeGroupKey) : {};
    this.persistExpandedGroups();
  }

  private isPathInUrl(path: string, url: string): boolean {
    return url === path || url.startsWith(`${path}/`) || url.startsWith(`${path}?`);
  }

  private findGroupByUrl(url: string): NavGroup | undefined {
    return this.navEntries.find(
      (entry): entry is NavGroup => entry.type === 'group' && entry.children.some((child) => this.isPathInUrl(child.path, url)),
    );
  }

  private createSingleOpenState(groupKey: string): Record<string, boolean> {
    return { [groupKey]: true };
  }

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

  private persistExpandedGroups(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.expandedGroups));
  }
}
