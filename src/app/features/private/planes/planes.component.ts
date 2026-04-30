import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ModuleCardComponent } from '../../../shared/components/module-card/module-card.component';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [PageHeaderComponent, ModuleCardComponent],
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.scss',
})
export class PlanesComponent {
  readonly cards = [
    { title: 'Gestión de planes', description: 'Placeholder para catálogo de planes, precios y beneficios.', tag: 'Módulo' },
  ];
}
