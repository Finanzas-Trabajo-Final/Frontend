import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bond } from '../models/bond.model';
import { FinancialIndicators } from '../models/financial-indicators.model';

@Injectable({
  providedIn: 'root'
})
export class BondService {
  private baseUrl = 'https://backend-wx5p.onrender.com/api/v1/bonds';

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
