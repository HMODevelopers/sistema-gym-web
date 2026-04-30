import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ModuleCardComponent } from '../../../../shared/components/module-card/module-card.component';

@Component({
  selector: 'app-usuarios-page',
  standalone: true,
  imports: [PageHeaderComponent, ModuleCardComponent],
  template: `
    <section class="space-y-6">
      <app-page-header [title]="'Usuarios'" [description]="'Administración de usuarios internos del sistema.'" />
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        @for (card of cards; track card.title) {
          <app-module-card [title]="card.title" [description]="card.description" [tag]="card.tag" />
        }
      </div>
    </section>
  `,
})
export class UsuariosPageComponent {
  readonly cards = [
    { title: 'Gestión de usuarios', description: 'Placeholder para altas, bajas y edición de usuarios.', tag: 'Módulo' },
  ];
}
