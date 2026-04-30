import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ModuleCardComponent } from '../../../shared/components/module-card/module-card.component';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [PageHeaderComponent, ModuleCardComponent],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.scss',
})
export class PagosComponent {
  readonly cards = [
    { title: 'Gestión de pagos', description: 'Placeholder para registro y consulta de pagos.', tag: 'Módulo' },
  ];
}
