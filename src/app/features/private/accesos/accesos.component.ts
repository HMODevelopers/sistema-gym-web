import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ModuleCardComponent } from '../../../shared/components/module-card/module-card.component';

@Component({
  selector: 'app-accesos',
  standalone: true,
  imports: [PageHeaderComponent, ModuleCardComponent],
  templateUrl: './accesos.component.html',
  styleUrl: './accesos.component.scss',
})
export class AccesosComponent {
  readonly cards = [
    { title: 'Control de accesos', description: 'Placeholder para validación y bitácora de ingresos.', tag: 'Módulo' },
  ];
}
