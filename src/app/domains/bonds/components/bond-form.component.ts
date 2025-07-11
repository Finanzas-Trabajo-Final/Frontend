import { Component, EventEmitter, Output } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BondService } from '../services/bond.service';
import { FinancialIndicatorsComponent } from './financial-indicators.component';
import { BondScheduleComponent } from './bond-schedule.component';

@Component({
  selector: 'app-bond-form',
  template: `
    <div class="form-container">
      <!-- Formulario de creación de bono -->
      <div *ngIf="!bondCreated">
        <form [formGroup]="bondForm" (ngSubmit)="onSubmit()">
          <table class="bond-form-table">
            <thead>
            <tr>
              <th colspan="2" class="gradient-title">Datos del Bono</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Valor Nominal</td>
              <td><input formControlName="faceValue" type="number"/></td>
            </tr>
            <tr>
              <td>Valor Comercial</td>
              <td><input formControlName="commercialValue" type="number"/></td>
            </tr>
            <tr>
              <td>Tipo de Tasa de Interés</td>
              <td>
                <select formControlName="interestRateType">
                  <option value="EFECTIVA">Efectiva</option>
                  <option value="NOMINAL">Nominal</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Tasa de Interés Anual</td>
              <td><input formControlName="annualInterestRate" type="number" step="0.01"/></td>
            </tr>
            <tr>
              <td>Periodo de Capitalización</td>
              <td><input formControlName="capitalizationPeriod" type="number"/></td>
            </tr>
            <tr>
              <td>Plazo en Años</td>
              <td><input formControlName="termInYears" type="number"/></td>
            </tr>
            <tr>
              <td>Frecuencia de Pago (Meses)</td>
              <td><input formControlName="paymentFrequencyInMonths" type="number"/></td>
            </tr>
            <tr>
              <td>Meses de Gracia Totales</td>
              <td><input formControlName="totalGraceMonths" type="number"/></td>
            </tr>
            <tr>
              <td>Meses de Gracia Parciales</td>
              <td><input formControlName="partialGraceMonths" type="number"/></td>
            </tr>
            <tr>
              <td>Moneda</td>
              <td>
                <select formControlName="currency">
                  <option value="PEN">PEN</option>
                  <option value="USD">USD</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Tasa de Descuento</td>
              <td><input formControlName="discountRate" type="number" step="0.01"/></td>
            </tr>
            <tr>
              <td>Impuesto a la Renta</td>
              <td><input formControlName="incomeTaxRate" type="number" step="0.01"/></td>
            </tr>
            <tr>
              <td>Fecha de Desembolso</td>
              <td><input formControlName="disbursementDate" type="date"/></td>
            </tr>
            </tbody>
            <thead>
            <tr>
              <th colspan="2" class="gradient-title">Costes/Gastos Iniciales</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Prima (%)</td>
              <td><input formControlName="premiumPercentage" type="number" step="0.01"/></td>
            </tr>
            <tr>
              <td>Costo de Estructuración (%)</td>
              <td><input formControlName="structuringCostPercentage" type="number" step="0.01"/></td>
            </tr>
            <tr>
              <td>Costo de Colocación (%)</td>
              <td><input formControlName="placementCostPercentage" type="number" step="0.01"/></td>
            </tr>
            <tr>
              <td>Costo de Flotación (%)</td>
              <td><input formControlName="flotationCostPercentage" type="number" step="0.01"/></td>
            </tr>
            <tr>
              <td>Costo Cavali (%)</td>
              <td><input formControlName="cavaliCostPercentage" type="number" step="0.01"/></td>
            </tr>
          </tbody>
          </table>
          <button type="submit" [disabled]="bondForm.invalid || isLoading">
            {{ isLoading ? 'Creando bono...' : 'Crear Bono' }}
          </button>
        </form>
      </div>

      <!-- Resultados después de crear el bono -->
      <div *ngIf="bondCreated" class="results-container">
        <div class="success-message">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          <h3>¡Bono creado exitosamente!</h3>
          <p>ID del bono: {{ createdBondId }}</p>
        </div>

        <!-- Indicadores Financieros -->
        <app-financial-indicators [bondId]="createdBondId"></app-financial-indicators>

        <!-- Cronograma de Pagos -->
        <app-bond-schedule [bondId]="createdBondId"></app-bond-schedule>

        <!-- Botón para crear otro bono -->
        <div class="actions">
          <button (click)="createNewBond()" class="secondary-button">
            Crear Otro Bono
          </button>
        </div>
      </div>
    </div>
  `,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FinancialIndicatorsComponent,
    BondScheduleComponent
  ],
  styles: [
    `
      .form-container {
        border: 1px solid #ccc;
        padding: 1rem;
        border-radius: 8px;
        max-width: 800px;
        margin-left: 0;
        background-color: #f9f9f9;
      }

      .bond-form-table {
        width: 100%;
        border-collapse: collapse;
      }

      .bond-form-table th {
        text-align: left;
        padding: 0.5rem;
      }

      .gradient-title {
        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
        color: white;
        text-align: left;
        padding: 0.5rem;
        border-radius: 4px;
      }

      .bond-form-table td {
        padding: 0.5rem;
        border: 1px solid #ddd;
      }

      input, select {
        width: 100%;
        padding: 0.3rem;
        font-size: 0.9rem;
      }

      button {
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 4px;
      }

      button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }

      .results-container {
        max-width: 100%;
      }

      .success-message {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem;
        background-color: #d1fae5;
        border: 1px solid #a7f3d0;
        border-radius: 8px;
        color: #065f46;
        margin-bottom: 1.5rem;
      }

      .success-message svg {
        color: #059669;
      }

      .success-message h3 {
        margin: 0;
        font-size: 1.25rem;
      }

      .success-message p {
        margin: 0.25rem 0 0 0;
        font-size: 0.875rem;
      }

      .actions {
        display: flex;
        justify-content: center;
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 1px solid #e5e7eb;
      }

      .secondary-button {
        background-color: #6b7280;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 500;
      }

      .secondary-button:hover {
        background-color: #4b5563;
      }
    `
  ]
})
export class BondFormComponent {
  bondForm: FormGroup;
  bondCreated = false;
  createdBondId: number = 0;
  isLoading = false;

  @Output() bondCreatedEvent = new EventEmitter<number>();

  constructor(private fb: FormBuilder, private bondService: BondService) {
    this.bondForm = this.fb.group({
      faceValue: [null, Validators.required],
      commercialValue: [null, Validators.required],
      interestRateType: ['EFECTIVA', Validators.required],
      annualInterestRate: [null, Validators.required],
      capitalizationPeriod: [null, Validators.required],
      termInYears: [null, Validators.required],
      paymentFrequencyInMonths: [null, Validators.required],
      totalGraceMonths: [null, Validators.required],
      partialGraceMonths: [null, Validators.required],
      currency: ['PEN', Validators.required],
      discountRate: [null, Validators.required],
      incomeTaxRate: [null, Validators.required],
      disbursementDate: [null, Validators.required],
      premiumPercentage: [null, Validators.required],
      structuringCostPercentage: [null, Validators.required],
      placementCostPercentage: [null, Validators.required],
      flotationCostPercentage: [null, Validators.required],
      cavaliCostPercentage: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.bondForm.valid) {
      this.isLoading = true;
      this.bondService.createBond(this.bondForm.value).subscribe({
        next: (response) => {
          console.log('Bond created successfully:', response);
          this.createdBondId = response.id;
          this.bondCreated = true;
          this.isLoading = false;
          this.bondCreatedEvent.emit(response.id);
        },
        error: (error) => {
          console.error('Error creating bond:', error);
          this.isLoading = false;
          // Aquí podrías mostrar un mensaje de error
        }
      });
    }
  }

  createNewBond(): void {
    this.bondCreated = false;
    this.createdBondId = 0;
    this.bondForm.reset({
      interestRateType: 'EFECTIVA',
      currency: 'PEN'
    });
  }
}
