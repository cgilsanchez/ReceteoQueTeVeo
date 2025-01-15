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
    this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationEnd) {
        const isAuthenticated = await this.authService.isAuthenticated();
        this.showMenu = isAuthenticated; // Mostrar el menú solo si está autenticado
      }
    });
  }

  async ngOnInit(): Promise<void> {
    await this.checkAuthentication(); // Verificar autenticación al iniciar la aplicación
  }

  async checkAuthentication(): Promise<void> {
    // Inicializa el almacenamiento y verifica la autenticación
    await this.authService.init();
    const isAuthenticated = await this.authService.isAuthenticated();
    console.log('¿Está autenticado?:', isAuthenticated);

    if (isAuthenticated) {
      this.router.navigate(['/recetas']); // Redirige al usuario autenticado
    } else {
      this.router.navigate(['/login']); // Si no está autenticado, redirige al login
    }
  }

  closeMenu(): void {
    this.menuCtrl.close(); // Cierra el menú automáticamente
  }

  async logout(): Promise<void> {
    await this.authService.logout(); // Elimina el token de sesión
    this.router.navigate(['/login']); // Redirige al login
  }
}
