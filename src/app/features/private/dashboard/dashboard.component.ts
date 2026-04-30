import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ModuleCardComponent } from '../../../shared/components/module-card/module-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PageHeaderComponent, ModuleCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  readonly cards = [
    { title: 'Clientes activos', description: 'Indicador principal de clientes con membresía vigente.', tag: 'KPI' },
    { title: 'Membresías por vencer', description: 'Seguimiento preventivo para renovaciones cercanas.', tag: 'Alerta' },
    { title: 'Ingresos del día', description: 'Resumen rápido de ingresos registrados hoy.', tag: 'Finanzas' },
    { title: 'Accesos de hoy', description: 'Cantidad de accesos validados durante la jornada.', tag: 'Operación' },
  ];
}
