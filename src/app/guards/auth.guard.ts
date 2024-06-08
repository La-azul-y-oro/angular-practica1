import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUserLoginOn.pipe(
    take(1),
    map((loggedIn: boolean) => {
      if (loggedIn) {
        return true;
      } else {
        router.navigate(['/inicio']);
        return false;
      }
    })
  );
};

export const authGuardNotLogin: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUserLoginOn.pipe(
    take(1),
    map((loggedIn: boolean) => {
      if (loggedIn) {
        router.navigate(['/usuarios']);
        return false;
      } else {
        return true;
      }
    })
  );
};


