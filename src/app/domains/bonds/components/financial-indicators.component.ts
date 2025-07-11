import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BondService } from '../services/bond.service';
import { FinancialIndicators } from '../models/financial-indicators.model';

@Component({
  selector: 'app-financial-indicators',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="financial-indicators">
      <div class="header">
        <h3>Indicadores Financieros</h3>
        <div class="loading" *ngIf="isLoading">
          <div class="spinner"></div>
          <span>Cargando indicadores...</span>
        </div>
      </div>

      <div class="error-message" *ngIf="errorMessage">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
        </svg>
        {{ errorMessage }}
      </div>

      <div class="indicators-grid" *ngIf="indicators && !isLoading">
        <!-- Tasas y Períodos -->
        <div class="indicator-section">
          <h4>Tasas y Períodos</h4>
          <div class="indicator-item">
            <span class="label">Frecuencia de Pago (días):</span>
            <span class="value">{{ indicators.paymentFrequencyDays | number:'1.0-0' }}</span>
          </div>
          <div class="indicator-item">
            <span class="label">Capitalización (días):</span>
            <span class="value">{{ indicators.capitalizationDays | number:'1.0-0' }}</span>
          </div>
          <div class="indicator-item">
            <span class="label">Períodos por Año:</span>
            <span class="value">{{ indicators.periodsPerYear | number:'1.0-0' }}</span>
          </div>
          <div class="indicator-item">
            <span class="label">Total de Períodos:</span>
            <span class="value">{{ indicators.totalPeriods | number:'1.0-0' }}</span>
          </div>
        </div>

        <!-- Tasas Efectivas -->
        <div class="indicator-section">
          <h4>Tasas Efectivas</h4>
          <div class="indicator-item">
            <span class="label">Tasa Efectiva Anual:</span>
            <span class="value">{{ indicators.annualEffectiveRate | percent:'1.2-2' }}</span>
          </div>
          <div class="indicator-item">
            <span class="label">Tasa Efectiva Periódica:</span>
            <span class="value">{{ indicators.periodicEffectiveRate | percent:'1.4-4' }}</span>
          </div>
          <div class="indicator-item">
            <span class="label">Tasa de Descuento Periódica:</span>
            <span class="value">{{ indicators.periodicDiscountRate | percent:'1.4-4' }}</span>
          </div>
        </div>

        <!-- Costos Iniciales -->
        <div class="indicator-section">
          <h4>Costos Iniciales</h4>
          <div class="indicator-item">
            <span class="label">Costos Emisor:</span>
            <span class="value">{{ indicators.issuerInitialCosts | currency:'PEN':'symbol':'1.2-2' }}</span>
          </div>
          <div class="indicator-item">
            <span class="label">Costos Bonista:</span>
            <span class="value">{{ indicators.bondholderInitialCosts | currency:'PEN':'symbol':'1.2-2' }}</span>
          </div>
        </div>

        <!-- Precio y Rentabilidad -->
        <div class="indicator-section">
          <h4>Precio y Rentabilidad</h4>
          <div class="indicator-item">
            <span class="label">Precio Actual:</span>
            <span class="value">{{ indicators.currentPrice | currency:'PEN':'symbol':'1.2-2' }}</span>
          </div>
          <div class="indicator-item">
            <span class="label">Ganancia/Pérdida:</span>
            <span class="value" [class.positive]="indicators.profitOrLoss > 0" [class.negative]="indicators.profitOrLoss < 0">
              {{ indicators.profitOrLoss | currency:'PEN':'symbol':'1.2-2' }}
            </span>
          </div>
        </div>

        <!-- Duración y Convexidad -->
        <div class="indicator-section">
          <h4>Duración y Convexidad</h4>
          <div class="indicator-item">
            <span class="label">Duración:</span>
            <span class="value">{{ indicators.duration | number:'1.2-2' }}</span>
          </div>
          <div class="indicator-item">
            <span class="label">Convexidad:</span>
            <span class="value">{{ indicators.convexity | number:'1.2-2' }}</span>
          </div>
          <div class="indicator-item">
            <span class="label">Duración + Convexidad:</span>
            <span class="value">{{ indicators.totalDurationPlusConvexity | number:'1.2-2' }}</span>
          </div>
          <div class="indicator-item">
            <span class="label">Duración Modificada:</span>
            <span class="value">{{ indicators.modifiedDuration | number:'1.2-2' }}</span>
          </div>
        </div>

        <!-- TCEA y TREA -->
        <div class="indicator-section">
          <h4>TCEA y TREA</h4>
          <div class="indicator-item">
            <span class="label">TCEA Emisor:</span>
            <span class="value">{{ indicators.tceaIssuer | percent:'1.2-2' }}</span>
          </div>
          <div class="indicator-item">
            <span class="label">TCEA Emisor con Escudo:</span>
            <span class="value">{{ indicators.tceaIssuerWithShield | percent:'1.2-2' }}</span>
          </div>
          <div class="indicator-item">
            <span class="label">TREA Bonista:</span>
            <span class="value">{{ indicators.treaBondholder | percent:'1.2-2' }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .financial-indicators {
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      margin: 1rem 0;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .header h3 {
      margin: 0;
      color: #1f2937;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .loading {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid #e5e7eb;
      border-top: 2px solid #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error-message {
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

    .indicators-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .indicator-section {
      background: #f9fafb;
      border-radius: 6px;
      padding: 1rem;
      border: 1px solid #e5e7eb;
    }

    .indicator-section h4 {
      margin: 0 0 1rem 0;
      color: #374151;
      font-size: 1rem;
      font-weight: 600;
      border-bottom: 1px solid #d1d5db;
      padding-bottom: 0.5rem;
    }

    .indicator-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid #f3f4f6;
    }

    .indicator-item:last-child {
      border-bottom: none;
    }

    .label {
      color: #6b7280;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .value {
      color: #1f2937;
      font-size: 0.875rem;
      font-weight: 600;
      text-align: right;
    }

    .value.positive {
      color: #059669;
    }

    .value.negative {
      color: #dc2626;
    }

    @media (max-width: 768px) {
      .indicators-grid {
        grid-template-columns: 1fr;
      }
      
      .indicator-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
      }
      
      .value {
        text-align: left;
      }
    }
  `]
})
export class FinancialIndicatorsComponent implements OnInit {
  @Input() bondId!: number;
  
  indicators: FinancialIndicators | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(private bondService: BondService) {}

  ngOnInit(): void {
    if (this.bondId) {
      this.loadFinancialIndicators();
    }
  }

  ngOnChanges(): void {
    if (this.bondId) {
      this.loadFinancialIndicators();
    }
  }

  private loadFinancialIndicators(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.indicators = null;

    this.bondService.getFinancialIndicators(this.bondId).subscribe({
      next: (data) => {
        this.indicators = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading financial indicators:', error);
        this.errorMessage = 'Error al cargar los indicadores financieros. Intenta nuevamente.';
        this.isLoading = false;
      }
    });
  }
} 