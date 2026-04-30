import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div class="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 class="text-2xl font-semibold text-slate-900">Sistema Gym</h1>
        <p class="mt-2 text-sm text-slate-600">Accede al panel administrativo del gimnasio.</p>

        <form class="mt-6 space-y-4" (ngSubmit)="submit()">
          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">Usuario o correo</label>
            <input [(ngModel)]="username" name="username" type="text" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring" />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">Contraseña</label>
            <input [(ngModel)]="password" name="password" type="password" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring" />
          </div>

          @if (errorMessage) {
            <p class="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{{ errorMessage }}</p>
          }

          <button type="submit" class="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">Iniciar sesión</button>
        </form>
      </div>
    </section>
  `,
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      void this.router.navigate(['/dashboard']);
    }
  }

  submit(): void {
    if (this.authService.login(this.username, this.password)) {
      this.errorMessage = '';
      void this.router.navigate(['/dashboard']);
      return;
    }

    this.errorMessage = 'Debes completar usuario y contraseña para continuar.';
  }
}
