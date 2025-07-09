import { Component, EventEmitter, Output } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { BondService } from '../services/bond.service';

@Component({
  selector: 'app-bond-form',
  template: `
    <div class="form-container">
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
        <button type="submit" [disabled]="bondForm.invalid">Enviar</button>
      </form>
    </div>
  `,
  imports: [
    ReactiveFormsModule
  ],
  styles: [
    `
      .form-container {
        border: 1px solid #ccc;
        padding: 1rem;
        border-radius: 8px;
        max-width: 600px;
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
      }

      button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    `
  ]
})
export class BondFormComponent {
  bondForm: FormGroup;

  @Output() bondCreated = new EventEmitter<number>();

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
      this.bondService.createBond(this.bondForm.value).subscribe(response => {
        console.log('Bond created successfully:', response);
        this.bondCreated.emit(response.id); // Emitir el ID del bono creado
      });
    }
  }
}
