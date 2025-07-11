import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bond } from '../models/bond.model';
import { FinancialIndicators } from '../models/financial-indicators.model';

@Injectable({
  providedIn: 'root'
})
export class BondService {
  private baseUrl = 'http://localhost:8080/api/v1/bonds'; // Cambia esta URL cuando tengas el endpoint definitivo

  constructor(private http: HttpClient) {}

  createBond(bond: Bond): Observable<any> {
    const body = {
      issuer: 'Banco de América',
      ...bond
    };
    return this.http.post(this.baseUrl, body);
  }

  getFinancialIndicators(bondId: number): Observable<FinancialIndicators> {
    return this.http.get<FinancialIndicators>(`${this.baseUrl}/${bondId}/financial-indicators`);
  }
}
