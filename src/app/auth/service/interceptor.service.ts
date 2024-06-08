import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    let authService = inject(AuthService)

    let token: string = authService.userToken;

    if (token != "") {
        req = req.clone(
            {
                setHeaders: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
    }
    return next(req);
}
