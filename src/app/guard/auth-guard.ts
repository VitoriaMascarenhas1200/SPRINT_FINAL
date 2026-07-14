import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLogado()) {
    return true;
  }
  router.navigate(['/home'], { queryParams: { redirect: state.url } });
  return false;
};
