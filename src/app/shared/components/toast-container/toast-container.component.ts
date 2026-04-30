import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { ToastService, ToastType } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="pointer-events-none fixed right-4 top-4 z-[110] flex w-full max-w-sm flex-col gap-2">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="pointer-events-auto rounded-lg border px-4 py-3 text-sm shadow-lg" [ngClass]="getClasses(toast.type)">
          <div class="flex items-start justify-between gap-4">
            <p>{{ toast.message }}</p>
            <button type="button" (click)="toastService.remove(toast.id)" class="font-bold">×</button>
          </div>
        </div>
      }
    </div>
  `,
})
export class ToastContainerComponent {
  constructor(public readonly toastService: ToastService) {}

  getClasses(type: ToastType): string {
    const variants: Record<ToastType, string> = {
      success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
      error: 'border-red-200 bg-red-50 text-red-800',
      info: 'border-blue-200 bg-blue-50 text-blue-800',
      warning: 'border-amber-200 bg-amber-50 text-amber-800',
    };

    return variants[type];
  }
}
