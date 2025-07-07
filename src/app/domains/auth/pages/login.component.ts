import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { InputComponent } from '../../../shared/components/input.component';
import { ButtonComponent } from '../../../shared/components/button.component';
import { AuthRequest } from '../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    InputComponent,
    ButtonComponent
  ],
  template: `
    <div class="login-form">
      <div class="form-header">
        <h2>Iniciar Sesión</h2>
        <p>Ingresa tus credenciales para acceder</p>
      </div>

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="form">
        <app-input
          label="Email"
          type="text"
          placeholder="Ingresa tu email"
          formControlName="email"
          [hasError]="isFieldInvalid('email')"
          [errorMessage]="getFieldError('email')"
        ></app-input>

        <app-input
          label="Contraseña"
          type="password"
          placeholder="Ingresa tu contraseña"
          formControlName="password"
          [hasError]="isFieldInvalid('password')"
          [errorMessage]="getFieldError('password')"
        ></app-input>

        <div *ngIf="errorMessage" class="error-alert">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
          </svg>
          {{ errorMessage }}
        </div>

        <app-button
          type="submit"
          variant="primary"
          [fullWidth]="true"
          [loading]="isLoading"
          [disabled]="loginForm.invalid"
        >
          Iniciar Sesión
        </app-button>
      </form>

      <div class="form-footer">
        <p>
          ¿No tienes una cuenta?
          <a routerLink="/auth/register" class="link">Regístrate aquí</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .login-form {
      width: 100%;
    }

    .form-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .form-header h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1f2937;
      margin: 0 0 0.5rem 0;
    }

    .form-header p {
      color: #6b7280;
      font-size: 0.875rem;
      margin: 0;
    }

    .form {
      margin-bottom: 1.5rem;
    }

    .error-alert {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background-color: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 0.5rem;
      color: #dc2626;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .form-footer {
      text-align: center;
      padding-top: 1rem;
      border-top: 1px solid #e5e7eb;
    }

    .form-footer p {
      color: #6b7280;
      font-size: 0.875rem;
      margin: 0;
    }

    .link {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 500;
    }

    .link:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const authRequest: AuthRequest = this.loginForm.value;

      this.authService.login(authRequest).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          // Store token manually since service no longer handles it
          localStorage.setItem('token', response.token);
          
          // Get user info using the email from the response
          this.authService.getUserByEmail(response.userId).subscribe({
            next: (userInfo) => {
              console.log('User info:', userInfo);
              this.router.navigate(['/dashboard']);
            },
            error: (userError) => {
              console.error('Error getting user info:', userError);
              // Still navigate to dashboard even if user info fails
              this.router.navigate(['/dashboard']);
            }
          });
        },
        error: (error) => {
          console.error('Login error', error);
          this.errorMessage = error.error?.message || 'Error al iniciar sesión. Verifica tus credenciales.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) {
        return `${fieldName === 'email' ? 'Usuario' : 'Contraseña'} es requerido`;
      }
      if (field.errors['minlength']) {
        const minLength = field.errors['minlength'].requiredLength;
        return `Mínimo ${minLength} caracteres`;
      }
    }
    return '';
  }
}
