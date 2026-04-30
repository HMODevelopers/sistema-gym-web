import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent],
  template: `
    <div class="flex min-h-screen bg-slate-100">
      <div class="hidden md:block">
        <app-sidebar />
      </div>
      <div class="flex min-w-0 flex-1 flex-col">
        <app-topbar />
        <main class="flex-1 p-4 md:p-6">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
})
export class AppLayoutComponent {}
