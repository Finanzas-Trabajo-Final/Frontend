import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../domains/auth/services/auth.service';
import { ButtonComponent } from '../shared/components/button.component';
import { UserDto } from '../domains/auth/models/user-dto.model';
import { BondFormComponent } from '../domains/bonds/components/bond-form.component';
import { BondScheduleComponent } from '../domains/bonds/components/bond-schedule.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ButtonComponent, BondFormComponent, BondScheduleComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  username: string = '';
  bondId: number | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get user info on component load
    const token = localStorage.getItem('token');
    if (token) {
      // Decode token to get email (simple approach - in production use proper JWT decode)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const email = payload.sub || payload.email;

        if (email) {
          this.authService.getUserByEmail(email).subscribe({
            next: (userInfo: UserDto) => {
              console.log('Dashboard - User info loaded:', userInfo);
              this.username = userInfo.username;
            },
            error: (error) => {
              console.error('Error loading user info:', error);
              this.username = 'Usuario';
            }
          });
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        this.username = 'Usuario';
      }
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
