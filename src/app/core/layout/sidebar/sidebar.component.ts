import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { SidebarIconComponent, SidebarIconName } from './sidebar-icon.component';

interface BaseNav {
  label: string;
  icon: SidebarIconName;
}

interface NavItem extends BaseNav {
  type: 'item';
  path: string;
  permission?: string;
  permissions?: string[];
  requireAllPermissions?: boolean;
  roles?: string[];
}

interface NavGroup extends BaseNav {
  type: 'group';
  key: string;
  permission?: string;
  permissions?: string[];
  requireAllPermissions?: boolean;
  roles?: string[];
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
  // Bindings recibidos desde AppLayoutComponent
  @Input() mobileOpen = false;
  @Input() collapsed = false;
  @Input() isDesktop = true;

  @Output() collapsedChange = new EventEmitter<boolean>();
  @Output() menuNavigate = new EventEmitter<void>();

  get isDesktopCollapsed(): boolean {
    return this.isDesktop && this.collapsed;
  }

  get isMobileDrawer(): boolean {
    return !this.isDesktop && this.mobileOpen;
  }

  get shouldShowInlineChildren(): boolean {
    return !this.isDesktopCollapsed;
  }

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
        { label: 'Recepción', path: '/recepcion', permissions: ['accesos.ver', 'accesos.validar'] },
        { label: 'Accesos', path: '/accesos', permission: 'accesos.ver' },
      ],
    },
    {
      type: 'group',
      key: 'comercial',
      label: 'Comercial',
      icon: 'comercial',
      children: [
        { label: 'Clientes', path: '/clientes', permission: 'clientes.ver' },
        { label: 'Membresías', path: '/membresias', permission: 'membresias.ver' },
        { label: 'Pagos', path: '/pagos', permission: 'pagos.ver' },
      ],
    },
    {
      type: 'group',
      key: 'catalogos',
      label: 'Catálogos',
      icon: 'catalogos',
      children: [
        { label: 'Planes', path: '/planes', permission: 'planes.ver' },
        { label: 'Sucursales', path: '/sucursales', permission: 'sucursales.ver' },
      ],
    },
    {
      type: 'group',
      key: 'administracion',
      label: 'Administración',
      icon: 'administracion',
      children: [
        { label: 'Usuarios', path: '/usuarios', permission: 'usuarios.ver' },
        { label: 'Roles', path: '/roles', permission: 'roles.ver' },
      ],
    },
    {
      type: 'group',
      key: 'analisis',
      label: 'Análisis',
      icon: 'analisis',
      children: [{ label: 'Reportes', path: '/reportes', permission: 'reportes.ver' }],
    },
  ];
  visibleNavEntries: NavEntry[] = [];

  expandedGroups: Record<string, boolean> = {};
  activeFlyoutKey: string | null = null;
  private closeFlyoutTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly flyoutCloseDelayMs = 180;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.visibleNavEntries = this.filterMenuByPermissions(this.navEntries);
    this.expandedGroups = this.readStoredGroups();
    this.ensureRouteGroupOpen(this.router.url);
    this.subscription.add(
      this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe((event) => this.ensureRouteGroupOpen(event.urlAfterRedirects)),
    );
  }

  ngOnDestroy(): void {
    this.cancelCloseFlyout();
    this.subscription.unsubscribe();
  }

  toggleCollapsed(): void {
    this.collapsedChange.emit(!this.collapsed);
  }

  toggleGroup(groupKey: string): void {
    if (this.isDesktopCollapsed) {
      this.toggleFlyout(groupKey);
      return;
    }

    const shouldOpen = !this.expandedGroups[groupKey];
    this.expandedGroups = shouldOpen ? this.createSingleOpenState(groupKey) : {};
    this.persistExpandedGroups();
  }

  openFlyout(groupKey: string): void {
    if (!this.isDesktopCollapsed) return;
    this.cancelCloseFlyout();
    this.activeFlyoutKey = groupKey;
  }

  closeFlyout(): void {
    this.cancelCloseFlyout();
    this.activeFlyoutKey = null;
  }

  closeFlyoutWithDelay(): void {
    if (!this.isDesktopCollapsed) return;
    this.cancelCloseFlyout();
    this.closeFlyoutTimer = setTimeout(() => {
      this.activeFlyoutKey = null;
      this.closeFlyoutTimer = null;
    }, this.flyoutCloseDelayMs);
  }

  cancelCloseFlyout(): void {
    if (!this.closeFlyoutTimer) return;
    clearTimeout(this.closeFlyoutTimer);
    this.closeFlyoutTimer = null;
  }

  toggleFlyout(groupKey: string): void {
    if (!this.isDesktopCollapsed) return;
    this.cancelCloseFlyout();
    this.activeFlyoutKey = this.activeFlyoutKey === groupKey ? null : groupKey;
  }

  isFlyoutGroupOpen(groupKey: string): boolean {
    return this.isDesktopCollapsed && this.activeFlyoutKey === groupKey;
  }

  closeFlyoutAfterNavigation(): void {
    this.closeFlyout();
    this.menuNavigate.emit();
  }

  isGroupExpanded(groupKey: string): boolean {
    return Boolean(this.expandedGroups[groupKey]);
  }

  isGroupHighlighted(group: NavGroup): boolean {
    return this.isGroupExpanded(group.key) || this.isGroupRouteActive(group);
  }

  isGroupVisuallyActive(group: NavGroup): boolean {
    return this.isGroupHighlighted(group) || this.isFlyoutGroupOpen(group.key);
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
    return this.visibleNavEntries.find(
      (entry): entry is NavGroup => entry.type === 'group' && entry.children.some((child) => this.isPathInUrl(child.path, url)),
    );
  }

  private filterMenuByPermissions(items: NavEntry[]): NavEntry[] {
    return items.reduce<NavEntry[]>((acc, item) => {
      if (item.type === 'item') {
        if (this.canShowMenuItem(item)) {
          acc.push({ ...item });
        }
        return acc;
      }

      const children = item.children.filter((child) => this.canShowMenuItem(child)).map((child) => ({ ...child }));
      if (!children.length || !this.canShowMenuItem(item)) {
        return acc;
      }

      acc.push({ ...item, children });
      return acc;
    }, []);
  }

  private canShowMenuItem(item: { permission?: string; permissions?: string[]; requireAllPermissions?: boolean; roles?: string[] }): boolean {
    if (item.permission && !this.authService.hasPermission(item.permission)) return false;
    if (item.roles?.length && !this.authService.hasAnyRole(item.roles)) return false;
    if (item.permissions?.length) {
      return item.requireAllPermissions
        ? this.authService.hasAllPermissions(item.permissions)
        : this.authService.hasAnyPermission(item.permissions);
    }

    return true;
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
