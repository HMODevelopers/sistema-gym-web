import { Component, input } from '@angular/core';

@Component({
  selector: 'app-module-card',
  standalone: true,
  template: `
    <article class="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/35 backdrop-blur-sm">
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/10"></div>
      <div class="relative flex items-start justify-between gap-3">
        <h3 class="text-base font-semibold text-white">{{ title() }}</h3>
        @if (tag()) {
          <span class="rounded-full border border-violet-300/35 bg-violet-500/15 px-2.5 py-1 text-xs font-medium text-violet-100">{{ tag() }}</span>
        }
      </div>
      <p class="relative mt-3 text-sm text-slate-300">{{ description() }}</p>
    </article>
  `,
})
export class ModuleCardComponent {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly tag = input<string>('');
}
