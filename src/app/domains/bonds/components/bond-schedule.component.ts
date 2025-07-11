import { Component, Input, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bond-schedule',
  template: `
    <div class="schedule-container">
      <h3>Calendario de Cuotas</h3>
      @if (schedule.length) {
        <table class="schedule-table">
          <thead>
        <tr>
          <th>Periodo</th>
          <th>Inflación Anual</th>
          <th>Inflación Periodo</th>
          <th>Tipo de Gracia</th>
          <th>Valor del Bono</th>
          <th>Valor Indexado</th>
          <th>Cuota</th>
          <th>Amortización</th>
          <th>Prima</th>
          <th>Escudo Fiscal</th>
          <th>Flujo Emisor</th>
          <th>Flujo Emisor con Escudo</th>
          <th>Flujo Bonista</th>
          <th>Flujo Descontado</th>
          <th>Flujo por Plazo</th>
          <th>Factor de Convexidad</th>
        </tr>
        </thead>
        <tbody>
          @for (row of schedule; track row.period) {
            <tr>          <td>{{ row.period }}</td>
          <td>{{ row.scheduledDateInflationAnnual }}</td>
          <td>{{ row.scheduledDateInflationPeriod }}</td>
          <td>{{ row.graceType }}</td>
          <td>{{ row.bondValue }}</td>
          <td>{{ row.indexedBondValue }}</td>
          <td>{{ row.quota }}</td>
          <td>{{ row.amortization }}</td>
          <td>{{ row.premium }}</td>
          <td>{{ row.taxShield }}</td>
          <td>{{ row.issuerFlow }}</td>
          <td>{{ row.issuerFlowWithShield }}</td>
          <td>{{ row.bondholderFlow }}</td>
          <td>{{ row.discountedFlow }}</td>
          <td>{{ row.flowByTerm }}</td>
          <td>{{ row.convexityFactor }}</td>
        </tr>
          }
        </tbody>
      </table>
      } @else {
        <p>No hay datos disponibles.</p>
      }
    </div>
  `,
  imports: [
    CommonModule
  ],
  styles: [
    `
      .schedule-container {
        margin-top: 2rem;
      }

      .schedule-table {
        width: 100%;
        border-collapse: collapse;
      }

      .schedule-table th, .schedule-table td {
        border: 1px solid #ddd;
        padding: 0.5rem;
        text-align: center;
      }

      .schedule-table th {
        background-color: #007bff;
        color: white;
      }
    `
  ]
})
export class BondScheduleComponent implements OnChanges {
  @Input() bondId!: number;
  schedule: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnChanges(): void {
    if (this.bondId) {
      this.http.get<any[]>(`https://backend-wx5p.onrender.com/api/v1/bonds/${this.bondId}/schedule`).subscribe(data => {
        this.schedule = data;
      });
    }
  }
}
