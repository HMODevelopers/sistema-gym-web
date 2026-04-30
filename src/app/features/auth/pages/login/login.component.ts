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
    <section class="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-8 sm:px-6">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(99,102,241,0.24),transparent_42%),radial-gradient(circle_at_85%_12%,rgba(168,85,247,0.2),transparent_40%),radial-gradient(circle_at_80%_90%,rgba(217,70,239,0.14),transparent_45%),linear-gradient(140deg,#020617_0%,#0f172a_40%,#1e1b4b_100%)]"></div>
      <div class="pointer-events-none absolute -left-16 top-12 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl"></div>
      <div class="pointer-events-none absolute -right-16 bottom-8 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl"></div>

      <div class="relative grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-2xl shadow-indigo-950/40 backdrop-blur md:grid-cols-2">
        <aside class="relative hidden overflow-hidden p-10 md:block lg:p-12">
          <div class="absolute -right-16 top-8 h-52 w-52 rounded-full bg-violet-500/25 blur-3xl"></div>
          <div class="absolute -bottom-20 left-0 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl"></div>
          <div class="absolute bottom-5 right-12 h-28 w-28 rounded-3xl border border-white/20 bg-white/5"></div>
          <div class="absolute right-5 top-12 h-20 w-20 rounded-full border border-white/20 bg-indigo-200/10"></div>
          <div class="absolute left-10 top-8 h-px w-24 bg-gradient-to-r from-transparent via-violet-200/60 to-transparent"></div>

          <div class="relative z-10 flex h-full flex-col justify-between">
            <div class="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-violet-100/90">
              Plataforma administrativa
            </div>

            <div class="space-y-6">
              <h1 class="text-4xl font-semibold leading-tight text-white lg:text-5xl">SYS GYM</h1>
              <p class="max-w-md text-lg text-slate-200/90">Administra clientes, membresías, pagos y accesos desde una sola plataforma.</p>
              <p class="max-w-sm text-sm leading-relaxed text-slate-300/80">Una plataforma moderna para la operación administrativa y de recepción del gimnasio.</p>
            </div>

            <div class="grid grid-cols-2 gap-4 text-xs text-slate-200/90">
              <!--<div class="rounded-xl border border-white/10 bg-white/5 px-4 py-3">Gestión de membresías</div>
              <div class="rounded-xl border border-white/10 bg-white/5 px-4 py-3">Control de accesos</div>-->
            </div>
          </div>
        </aside>

        <div class="relative p-6 sm:p-8 md:p-10 lg:p-12">
          <div class="mx-auto w-full max-w-md">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300/90">SYS GYM</p>
            <h2 class="mt-3 text-3xl font-semibold text-white">Bienvenido de nuevo</h2>
            <p class="mt-2 text-sm text-slate-300">Inicia sesión para acceder al panel administrativo.</p>

            <form class="mt-8 space-y-5" [formGroup]="loginForm" (ngSubmit)="submit()">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-slate-200">Usuario o Correo</label>
                <input
                  formControlName="login"
                  type="text"
                  autocomplete="username"
                  placeholder="Ingresa tu usuario"
                  class="w-full rounded-xl border border-violet-200/15 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-violet-400/70 focus:ring-2 focus:ring-violet-500/40"
                />
                @if (isInvalid('login')) {
                  <p class="mt-1.5 text-xs text-rose-300">El usuario o correo es obligatorio.</p>
                }
              </div>

              <div>
                <label class="mb-1.5 block text-sm font-medium text-slate-200">Contraseña</label>
                <input
                  formControlName="password"
                  type="password"
                  autocomplete="current-password"
                  placeholder="Ingresa tu contraseña"
                  class="w-full rounded-xl border border-violet-200/15 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-violet-400/70 focus:ring-2 focus:ring-violet-500/40"
                />
                @if (isInvalid('password')) {
                  <p class="mt-1.5 text-xs text-rose-300">La contraseña es obligatoria.</p>
                }
              </div>

              <button
                type="submit"
                [disabled]="loadingService.isLoading()"
                class="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-violet-300/20 bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:from-violet-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-violet-400/60 disabled:cursor-not-allowed disabled:opacity-60"
              >
                @if (loadingService.isLoading()) {
                  <span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                  Iniciando...
                } @else {
                  Iniciar sesión
                }
              </button>
            </form>
          </div>
        </div>
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
