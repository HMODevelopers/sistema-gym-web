import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { ApiErrorService } from '../../../../core/services/api-error.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div class="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 class="text-2xl font-semibold text-slate-900">Sistema Gym</h1>
        <p class="mt-2 text-sm text-slate-600">Accede al panel administrativo del gimnasio.</p>

        <form class="mt-6 space-y-4" [formGroup]="loginForm" (ngSubmit)="submit()">
          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">Usuario o correo</label>
            <input formControlName="login" type="text" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring" />
            @if (isInvalid('login')) {
              <p class="mt-1 text-xs text-red-600">El usuario o correo es obligatorio.</p>
            }
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">Contraseña</label>
            <input formControlName="password" type="password" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring" />
            @if (isInvalid('password')) {
              <p class="mt-1 text-xs text-red-600">La contraseña es obligatoria.</p>
            }
          </div>

          <button type="submit" [disabled]="loadingService.isLoading()" class="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60">Iniciar sesión</button>
        </form>
      </div>
    </section>
  `,
})
export class LoginComponent implements OnInit {
  readonly loginForm;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly apiErrorService: ApiErrorService,
    protected readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly router: Router,
  ) {
    this.loginForm = this.fb.nonNullable.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      void this.router.navigate(['/dashboard']);
    }
  }

  isInvalid(controlName: 'login' | 'password'): boolean {
    const control = this.loginForm.controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastService.warning('Completa usuario y contraseña para continuar.');
      return;
    }

    this.loadingService.show();
    this.authService
      .login(this.loginForm.getRawValue())
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe({
        next: (session) => {
          this.toastService.success(`Bienvenido, ${session.user.nombre}.`);
          void this.router.navigate(['/dashboard']);
        },
        error: (error: unknown) => {
          this.toastService.error(this.apiErrorService.getErrorMessage(error));
        },
      });
  }
}
