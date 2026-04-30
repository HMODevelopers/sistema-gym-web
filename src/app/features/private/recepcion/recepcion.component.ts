import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ModuleCardComponent } from '../../../shared/components/module-card/module-card.component';

@Component({
  selector: 'app-recepcion',
  standalone: true,
  imports: [PageHeaderComponent, ModuleCardComponent],
  templateUrl: './recepcion.component.html',
  styleUrl: './recepcion.component.scss',
})
export class RecepcionComponent {
  readonly cards = [
    { title: 'Buscar cliente', description: 'Localiza rápidamente por nombre, código o documento.', tag: 'Atención' },
    { title: 'Validar acceso', description: 'Flujo inicial para validar ingreso al gimnasio.', tag: 'Control' },
    { title: 'Registrar pago', description: 'Acceso directo para registrar un pago en recepción.', tag: 'Cobro' },
    { title: 'Renovar membresía', description: 'Atajo para renovación rápida de membresías.', tag: 'Renovación' },
    { title: 'Enrolar huella', description: 'Preparado para proceso de enrolamiento biométrico.', tag: 'Biometría' },
  ];
}
