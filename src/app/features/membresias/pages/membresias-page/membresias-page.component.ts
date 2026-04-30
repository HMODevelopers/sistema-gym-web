import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ModuleCardComponent } from '../../../../shared/components/module-card/module-card.component';

@Component({
  selector: 'app-membresias-page',
  standalone: true,
  imports: [PageHeaderComponent, ModuleCardComponent],
  template: `
    <section class="space-y-6">
      <app-page-header [title]="'Membresías'" [description]="'Control de membresías, vigencias y renovaciones.'" />
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        @for (card of cards; track card.title) {
          <app-module-card [title]="card.title" [description]="card.description" [tag]="card.tag" />
        }
      </div>
    </section>
  `,
})
export class MembresiasPageComponent {
  readonly cards = [
    { title: 'Gestión de membresías', description: 'Placeholder para control de estado, vigencia y renovaciones.', tag: 'Módulo' },
  ];
}
