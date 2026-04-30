import { Component } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-global-loader',
  standalone: true,
  template: `
    @if (loadingService.isLoading()) {
      <div class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/30 backdrop-blur-[1px]">
        <div class="rounded-xl bg-white px-6 py-4 shadow-lg">
          <div class="flex items-center gap-3">
            <div class="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700"></div>
            <p class="text-sm font-medium text-slate-700">Procesando...</p>
          </div>
        </div>
      </div>
    }
  `,
})
export class GlobalLoaderComponent {
  constructor(public readonly loadingService: LoadingService) {}
}
