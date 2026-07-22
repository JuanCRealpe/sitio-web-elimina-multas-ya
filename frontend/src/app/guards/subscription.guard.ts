import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const subscriptionGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.esAdmin()) {  // ← admin siempre puede acceder
        return true;
    }

    if (authService.tieneSuscripcion()) {
        return true;
    }

    return router.createUrlTree(['/payment']);
};