import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<ToastMessage[]>([]);
  private nextId = 1;

  success(message: string): void { this.show('success', message); }
  error(message: string): void { this.show('error', message); }
  info(message: string): void { this.show('info', message); }
  warning(message: string): void { this.show('warning', message); }

  remove(id: number): void {
    this.toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
  }

  private show(type: ToastType, message: string): void {
    const id = this.nextId++;
    this.toasts.update((toasts) => [...toasts, { id, type, message }]);
    setTimeout(() => this.remove(id), 4000);
  }
}
