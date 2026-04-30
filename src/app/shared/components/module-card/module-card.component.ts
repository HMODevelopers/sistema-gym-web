import { Component, input } from '@angular/core';

@Component({
  selector: 'app-module-card',
  standalone: true,
  template: `
    <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div class="flex items-start justify-between gap-3">
        <h3 class="text-base font-semibold text-slate-900">{{ title() }}</h3>
        @if (tag()) {
          <span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">{{ tag() }}</span>
        }
      </div>
      <p class="mt-2 text-sm text-slate-600">{{ description() }}</p>
    </article>
  `,
})
export class ModuleCardComponent {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly tag = input<string>('');
}
