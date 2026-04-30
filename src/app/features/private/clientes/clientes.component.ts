import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ModuleCardComponent } from '../../../shared/components/module-card/module-card.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [PageHeaderComponent, ModuleCardComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss',
})
export class ClientesComponent {
  readonly cards = [
    { title: 'Gestión de clientes', description: 'Placeholder para listado, búsqueda y administración de clientes.', tag: 'Módulo' },
  ];
}
