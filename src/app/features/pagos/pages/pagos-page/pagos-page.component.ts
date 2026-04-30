import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ModuleCardComponent } from '../../../../shared/components/module-card/module-card.component';

@Component({
  selector: 'app-pagos-page',
  standalone: true,
  imports: [PageHeaderComponent, ModuleCardComponent],
  template: `
    <section class="space-y-6">
      <app-page-header [title]="'Pagos'" [description]="'Registro de pagos, renovaciones e ingresos.'" />
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        @for (card of cards; track card.title) {
          <app-module-card [title]="card.title" [description]="card.description" [tag]="card.tag" />
        }
      </div>
    </section>
  `,
})
export class PagosPageComponent {
  readonly cards = [
    { title: 'Gestión de pagos', description: 'Placeholder para registro y consulta de pagos.', tag: 'Módulo' },
  ];
}
