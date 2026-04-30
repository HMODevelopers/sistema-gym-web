import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ModuleCardComponent } from '../../../shared/components/module-card/module-card.component';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [PageHeaderComponent, ModuleCardComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss',
})
export class ReportesComponent {
  readonly cards = [
    { title: 'Panel de reportes', description: 'Placeholder para reportes gerenciales y operativos.', tag: 'Módulo' },
  ];
}
