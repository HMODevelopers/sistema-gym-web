import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ModuleCardComponent } from '../../../../shared/components/module-card/module-card.component';

@Component({
  selector: 'app-accesos-page',
  standalone: true,
  imports: [PageHeaderComponent, ModuleCardComponent],
  template: `
    <section class="space-y-6">
      <app-page-header [title]="'Accesos'" [description]="'Validación y bitácora de accesos al gimnasio.'" />
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        @for (card of cards; track card.title) {
          <app-module-card [title]="card.title" [description]="card.description" [tag]="card.tag" />
        }
      </div>
    </section>
  `,
})
export class AccesosPageComponent {
  readonly cards = [
    { title: 'Control de accesos', description: 'Placeholder para validación y bitácora de ingresos.', tag: 'Módulo' },
  ];
}
