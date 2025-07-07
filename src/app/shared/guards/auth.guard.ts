import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Simple token check without depending on AuthService
  const token = localStorage.getItem('token');
  
  if (token) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Simple token check without depending on AuthService
  const token = localStorage.getItem('token');
  
  if (!token) {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};
