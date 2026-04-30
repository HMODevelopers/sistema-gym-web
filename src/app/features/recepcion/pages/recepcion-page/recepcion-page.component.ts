import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ModuleCardComponent } from '../../../../shared/components/module-card/module-card.component';

@Component({
  selector: 'app-recepcion-page',
  standalone: true,
  imports: [PageHeaderComponent, ModuleCardComponent],
  template: `
    <section class="space-y-6">
      <app-page-header [title]="'Recepción'" [description]="'Panel operativo para atención rápida de clientes.'" />
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        @for (card of cards; track card.title) {
          <app-module-card [title]="card.title" [description]="card.description" [tag]="card.tag" />
        }
      </div>
    </section>
  `,
})
export class RecepcionPageComponent {
  readonly cards = [
    { title: 'Buscar cliente', description: 'Localiza rápidamente por nombre, código o documento.', tag: 'Atención' },
    { title: 'Validar acceso', description: 'Flujo inicial para validar ingreso al gimnasio.', tag: 'Control' },
    { title: 'Registrar pago', description: 'Acceso directo para registrar un pago en recepción.', tag: 'Cobro' },
    { title: 'Renovar membresía', description: 'Atajo para renovación rápida de membresías.', tag: 'Renovación' },
    { title: 'Enrolar huella', description: 'Preparado para proceso de enrolamiento biométrico.', tag: 'Biometría' },
  ];
}
