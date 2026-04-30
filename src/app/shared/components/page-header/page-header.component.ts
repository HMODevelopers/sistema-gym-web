import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  template: `
    <header class="mb-6">
      <h1 class="text-2xl font-semibold text-slate-900">{{ title() }}</h1>
      @if (description()) {
        <p class="mt-1 text-sm text-slate-600">{{ description() }}</p>
      }
    </header>
  `,
})
export class PageHeaderComponent {
  readonly title = input.required<string>();
  readonly description = input<string>('');
}
