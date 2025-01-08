import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showMenu: boolean = false;

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const noMenuRoutes = ['/login', '/register'];
        this.showMenu = !noMenuRoutes.includes(event.url); // Mostrar el menú si no está en login o register
      }
    });
  }

  closeMenu(): void {
    this.menuCtrl.close(); // Cierra el menú automáticamente
  }

  async logout(): Promise<void> {
    await this.authService.logout(); // Elimina el token de sesión
    this.router.navigate(['/login']); // Redirige al login
  }
}
