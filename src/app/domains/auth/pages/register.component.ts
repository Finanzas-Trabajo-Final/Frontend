import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { InputComponent } from '../../../shared/components/input.component';
import { ButtonComponent } from '../../../shared/components/button.component';
import { RegisterRequest } from '../models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    InputComponent,
    ButtonComponent
  ],
  template: `
    <div class="register-form">
      <div class="form-header">
        <h2>Crear Cuenta</h2>
        <p>Completa los datos para registrarte</p>
      </div>

      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="form">
        <app-input
          label="Correo Electrónico"
          type="email"
          placeholder="ejemplo@correo.com"
          formControlName="email"
          [hasError]="isFieldInvalid('email')"
          [errorMessage]="getFieldError('email')"
        ></app-input>

        <app-input
          label="Usuario"
          type="text"
          placeholder="Nombre de usuario"
          formControlName="username"
          [hasError]="isFieldInvalid('username')"
          [errorMessage]="getFieldError('username')"
        ></app-input>

        <app-input
          label="Contraseña"
          type="password"
          placeholder="Mínimo 6 caracteres"
          formControlName="password"
          [hasError]="isFieldInvalid('password')"
          [errorMessage]="getFieldError('password')"
        ></app-input>

        <app-input
          label="Confirmar Contraseña"
          type="password"
          placeholder="Repite tu contraseña"
          formControlName="confirmPassword"
          [hasError]="isFieldInvalid('confirmPassword')"
          [errorMessage]="getFieldError('confirmPassword')"
        ></app-input>

        <div *ngIf="errorMessage" class="error-alert">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
          </svg>
          {{ errorMessage }}
        </div>

        <div *ngIf="successMessage" class="success-alert">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg>
          {{ successMessage }}
        </div>

        <app-button
          type="submit"
          variant="primary"
          [fullWidth]="true"
          [loading]="isLoading"
          [disabled]="registerForm.invalid"
        >
          Crear Cuenta
        </app-button>
      </form>

      <div class="form-footer">
        <p>
          ¿Ya tienes una cuenta?
          <a routerLink="/auth/login" class="link">Inicia sesión aquí</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .register-form {
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

    .success-alert {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background-color: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 0.5rem;
      color: #16a34a;
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
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else if (confirmPassword?.errors?.['passwordMismatch']) {
      delete confirmPassword.errors['passwordMismatch'];
      if (Object.keys(confirmPassword.errors).length === 0) {
        confirmPassword.setErrors(null);
      }
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const { confirmPassword, ...registerRequest } = this.registerForm.value;
      const request: RegisterRequest = registerRequest;

      this.authService.register(request).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          // Store token manually since service no longer handles it
          localStorage.setItem('token', response.token);
          
          // Get user info using the email from the response
          this.authService.getUserByEmail(response.userId).subscribe({
            next: (userInfo) => {
              console.log('User info:', userInfo);
              this.successMessage = 'Cuenta creada exitosamente. Redirigiendo...';
              setTimeout(() => {
                this.router.navigate(['/dashboard']);
              }, 2000);
            },
            error: (userError) => {
              console.error('Error getting user info:', userError);
              // Still show success and navigate even if user info fails
              this.successMessage = 'Cuenta creada exitosamente. Redirigiendo...';
              setTimeout(() => {
                this.router.navigate(['/dashboard']);
              }, 2000);
            }
          });
        },
        error: (error) => {
          console.error('Registration error', error);
          this.errorMessage = error.error?.message || 'Error al crear la cuenta. Intenta nuevamente.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) {
        const fieldLabels: { [key: string]: string } = {
          email: 'Correo electrónico',
          username: 'Usuario',
          password: 'Contraseña',
          confirmPassword: 'Confirmación de contraseña'
        };
        return `${fieldLabels[fieldName]} es requerido`;
      }
      if (field.errors['email']) {
        return 'Ingresa un correo electrónico válido';
      }
      if (field.errors['minlength']) {
        const minLength = field.errors['minlength'].requiredLength;
        return `Mínimo ${minLength} caracteres`;
      }
      if (field.errors['passwordMismatch']) {
        return 'Las contraseñas no coinciden';
      }
    }
    return '';
  }
}
