import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthRequest, RegisterRequest, AuthResponse } from '../models/auth.model';
import { UserDto } from '../models/user-dto.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'https://backend-wx5p.onrender.com/api/v1';

  constructor(private http: HttpClient) {}

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/sign-in`, authRequest);
  }

  register(registerRequest: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/sign-up`, registerRequest);
  }

  getUserByEmail(email: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/user/getbyEmail/${email}`);
  }
}
