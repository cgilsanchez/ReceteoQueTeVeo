    import { Injectable } from '@angular/core';
    import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    } from '@angular/router';
    import { AuthService } from '../service/auth.service';

    @Injectable({
    providedIn: 'root',
    })
    export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        const isAuthenticated = await this.authService.isAuthenticated();
        console.log('¿Está autenticado en el guard?:', isAuthenticated);

        if (!isAuthenticated) {
        this.router.navigate(['/login']);
        return false;
        }
        return true;
    }
    }
