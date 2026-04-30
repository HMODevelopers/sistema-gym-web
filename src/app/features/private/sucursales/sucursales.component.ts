import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ModuleCardComponent } from '../../../shared/components/module-card/module-card.component';

@Component({
  selector: 'app-sucursales',
  standalone: true,
  imports: [PageHeaderComponent, ModuleCardComponent],
  templateUrl: './sucursales.component.html',
  styleUrl: './sucursales.component.scss',
})
export class SucursalesComponent {
  readonly cards = [
    { title: 'Gestión de sucursales', description: 'Placeholder para alta y administración de sucursales.', tag: 'Módulo' },
  ];
}
