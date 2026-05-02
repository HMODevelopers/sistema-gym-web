import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';

@Directive({
  selector: '[appHasPermission]',
  standalone: true,
})
export class HasPermissionDirective {
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly authService = inject(AuthService);

  private permissions: string[] = [];
  private mode: 'any' | 'all' = 'any';

  @Input()
  set appHasPermission(value: string | string[]) {
    this.permissions = Array.isArray(value) ? value : [value];
    this.updateView();
  }

  @Input()
  set appHasPermissionMode(value: 'any' | 'all') {
    this.mode = value;
    this.updateView();
  }

  private updateView(): void {
    const normalized = this.permissions.filter((permission) => typeof permission === 'string' && permission.trim().length > 0);
    const canShow = normalized.length
      ? this.mode === 'all'
        ? this.authService.hasAllPermissions(normalized)
        : this.authService.hasAnyPermission(normalized)
      : false;

    this.viewContainer.clear();
    if (canShow) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
