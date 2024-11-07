import { inject } from '@angular/core';
import { CanActivateFn, Router, CanMatchFn } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs';

// allows to load the dashboard module in the lazyloading
export const authGuardFn: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.userState$.pipe(
    take(1),
    map((user) => {
      if (user) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};

// This method allows to implement CanMatchFn
export const checkUserState = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.userState$.pipe(
    take(1),
    map((user) => {
      if (user) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};

export const authGuard: CanActivateFn = (route, state) => checkUserState();
export const authMatchGuard: CanMatchFn = (route, segments) => checkUserState();
