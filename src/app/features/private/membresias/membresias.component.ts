import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ModuleCardComponent } from '../../../shared/components/module-card/module-card.component';

@Component({
  selector: 'app-membresias',
  standalone: true,
  imports: [PageHeaderComponent, ModuleCardComponent],
  templateUrl: './membresias.component.html',
  styleUrl: './membresias.component.scss',
})
export class MembresiasComponent {
  readonly cards = [
    { title: 'Gestión de membresías', description: 'Placeholder para control de estado, vigencia y renovaciones.', tag: 'Módulo' },
  ];
}
