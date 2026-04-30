import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ModuleCardComponent } from '../../../shared/components/module-card/module-card.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [PageHeaderComponent, ModuleCardComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent {
  readonly cards = [
    { title: 'Gestión de usuarios', description: 'Placeholder para altas, bajas y edición de usuarios.', tag: 'Módulo' },
  ];
}
