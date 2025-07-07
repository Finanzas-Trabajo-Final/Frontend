import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      (click)="onClick()"
      class="btn"
      [class.btn-primary]="variant === 'primary'"
      [class.btn-secondary]="variant === 'secondary'"
      [class.btn-outline]="variant === 'outline'"
      [class.btn-loading]="loading"
      [class.btn-full-width]="fullWidth"
    >
      <span *ngIf="loading" class="spinner"></span>
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border: 2px solid transparent;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      box-sizing: border-box;
    }

    .btn:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .btn-primary {
      background-color: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #2563eb;
      border-color: #2563eb;
    }

    .btn-secondary {
      background-color: #6b7280;
      color: white;
      border-color: #6b7280;
    }

    .btn-secondary:hover:not(:disabled) {
      background-color: #4b5563;
      border-color: #4b5563;
    }

    .btn-outline {
      background-color: transparent;
      color: #3b82f6;
      border-color: #3b82f6;
    }

    .btn-outline:hover:not(:disabled) {
      background-color: #3b82f6;
      color: white;
    }

    .btn-full-width {
      width: 100%;
    }

    .spinner {
      width: 1rem;
      height: 1rem;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `]
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'outline' = 'primary';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Output() clickEvent = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.clickEvent.emit();
    }
  }
}
