import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from './service/auth.service';
import { TranslationService } from './service/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showMenu: boolean = false;
  currentLanguage: string = 'es';
  showLanguageMenu: boolean = false; 

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private authService: AuthService,
    private translationService: TranslationService
  ) {
    this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationEnd) {
        const isAuthenticated = await this.authService.isAuthenticated();
        this.showMenu = isAuthenticated;
      }
    });

    this.currentLanguage = this.translationService.getCurrentLanguage() || 'es';
    this.translationService.setLanguage(this.currentLanguage);
  }

  async ngOnInit(): Promise<void> {
    await this.checkAuthentication();
  }

  async checkAuthentication(): Promise<void> {
    await this.authService.init();
    const isAuthenticated = await this.authService.isAuthenticated();

    if (isAuthenticated) {
      this.router.navigate(['/recetas']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleLanguageMenu(): void {
    this.showLanguageMenu = !this.showLanguageMenu;
  }

  changeLanguage(lang: string): void {
    this.translationService.setLanguage(lang);
    this.currentLanguage = lang;
    this.showLanguageMenu = false; // Ocultar el menú al seleccionar
  }

  closeMenu(): void {
    this.menuCtrl.close();
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
