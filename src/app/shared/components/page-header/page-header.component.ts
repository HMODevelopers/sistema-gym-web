import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  template: `
    <header class="mb-6 rounded-2xl border border-slate-200 bg-white/80 dark:border-white/10 dark:bg-slate-900/65 p-5 shadow-xl shadow-slate-950/20 backdrop-blur-sm">
      <h1 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-3xl">{{ title() }}</h1>
      @if (description()) {
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ description() }}</p>
      }
    </header>
  `,
})
export class PageHeaderComponent {
  readonly title = input.required<string>();
  readonly description = input<string>('');
}
