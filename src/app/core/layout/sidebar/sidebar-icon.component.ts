import { Component, Input } from '@angular/core';

export type SidebarIconName =
  | 'dashboard'
  | 'operacion'
  | 'comercial'
  | 'catalogos'
  | 'administracion'
  | 'analisis';

@Component({
  selector: 'app-sidebar-icon',
  standalone: true,
  template: `
    @switch (icon) {
      @case ('dashboard') {
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="M3.5 11.5l8.5-7 8.5 7" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M6 10.5V20h12v-9.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      }
      @case ('operacion') {
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="M12 3l7 4v5c0 4.4-2.8 7.8-7 9-4.2-1.2-7-4.6-7-9V7l7-4z" />
          <path d="M8 12h8" stroke-linecap="round" />
        </svg>
      }
      @case ('comercial') {
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1" />
          <circle cx="9.5" cy="8" r="3" />
          <path d="M17 11a3 3 0 1 1 0 6" />
        </svg>
      }
      @case ('catalogos') {
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="M3 7h6l2 2h10v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
          <path d="M3 7V5a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v2" />
        </svg>
      }
      @case ('administracion') {
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .33 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.4-1.7 1.7 1.7 0 0 0-1 .2 1.7 1.7 0 0 0-.6.5l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.1-.4H3.4a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 5.2 9.2a1.7 1.7 0 0 0-.2-1 1.7 1.7 0 0 0-.5-.6l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 .4-1.1V3.4a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1.4 1.7 1.7 1.7 0 0 0 1-.2 1.7 1.7 0 0 0 .6-.5l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.2.3.3.7.3 1.1v.1a2 2 0 1 1 0 4h-.1c-.4 0-.8.1-1.1.3z" />
        </svg>
      }
      @case ('analisis') {
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="M4 20V6" stroke-linecap="round" />
          <path d="M4 20h16" stroke-linecap="round" />
          <path d="M8 16v-3M12 16V9M16 16v-6" stroke-linecap="round" />
        </svg>
      }
    }
  `,
})
export class SidebarIconComponent {
  @Input({ required: true }) icon!: SidebarIconName;
}
