import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ModuleCardComponent } from '../../../shared/components/module-card/module-card.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [PageHeaderComponent, ModuleCardComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent {
  readonly cards = [
    { title: 'Gestión de roles', description: 'Placeholder para perfiles y asignación de permisos.', tag: 'Módulo' },
  ];
}
