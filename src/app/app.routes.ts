import { Routes } from '@angular/router';
import { BondFormComponent } from './domains/bonds/components/bond-form.component';
import { BondScheduleComponent } from './domains/bonds/components/bond-schedule.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadComponent: () => import('./domains/auth/containers/auth-container.component').then(m => m.AuthContainerComponent),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () => import('./domains/auth/pages/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./domains/auth/pages/register.component').then(m => m.RegisterComponent)
      }
    ]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'bonds/form',
    component: BondFormComponent
  },
  {
    path: 'bonds/:id/schedule',
    component: BondScheduleComponent
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];
