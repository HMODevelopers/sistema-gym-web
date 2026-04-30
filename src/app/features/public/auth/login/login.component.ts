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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
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
