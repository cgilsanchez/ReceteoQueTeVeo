    import { Injectable } from '@angular/core';
    import { CanActivate, Router } from '@angular/router';
    import { AuthService } from '../service/auth.service';

    @Injectable({
    providedIn: 'root',
    })
    export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    async canActivate(): Promise<boolean> {
        const token = await this.authService.getToken(); // Verificar si hay un token
        if (token) {
        return true; // Permitir acceso si hay un token
        }
        this.router.navigate(['/login']); // Redirigir al login si no está autenticado
        return false;
    }
    }
