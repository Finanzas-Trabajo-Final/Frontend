import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-container',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1 class="auth-title">AmericaCash</h1>
          <p class="auth-subtitle">Gestiona tus finanzas de manera inteligente</p>
        </div>
        <div class="auth-content">
          <router-outlet></router-outlet>
        </div>
      </div>
      <div class="auth-background">
        <div class="auth-background-pattern"></div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 1rem;
      position: relative;
      overflow: hidden;
    }

    .auth-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
    }

    .auth-background-pattern {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(120, 119, 198, 0.2) 0%, transparent 50%);
    }

    .auth-card {
      background: white;
      border-radius: 1rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      max-width: 400px;
      width: 100%;
      overflow: hidden;
      position: relative;
      z-index: 1;
    }

    .auth-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem;
      text-align: center;
    }

    .auth-title {
      font-size: 1.875rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
      letter-spacing: -0.025em;
    }

    .auth-subtitle {
      font-size: 0.875rem;
      opacity: 0.9;
      margin: 0;
      font-weight: 300;
    }

    .auth-content {
      padding: 2rem;
    }

    @media (max-width: 480px) {
      .auth-container {
        padding: 0.5rem;
      }
      
      .auth-card {
        max-width: none;
        margin: 0;
      }
      
      .auth-header {
        padding: 1.5rem;
      }
      
      .auth-content {
        padding: 1.5rem;
      }
      
      .auth-title {
        font-size: 1.5rem;
      }
    }
  `]
})
export class AuthContainerComponent {}
