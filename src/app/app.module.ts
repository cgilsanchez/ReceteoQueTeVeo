import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ModalModule } from './comoponents/modal/modal.module'; // Si tienes un módulo para modales
import { ChefModalComponent } from './comoponents/chef-modal/chef-modal.component'; // Componente del modal
import { SplashComponent } from './comoponents/splash/splash.component'; // Componente del splash
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

// Función para cargar los archivos de traducción
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent, // Componente principal
    ChefModalComponent, // Modal del chef
    // Componente del splash
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), // Configuración base de Ionic
    AppRoutingModule, // Rutas de la app
    HttpClientModule, // Cliente HTTP para llamadas API
    IonicStorageModule.forRoot(), // Módulo de almacenamiento
    FormsModule, // Módulo de formularios
    ReactiveFormsModule, // Módulo de formularios reactivos
    ModalModule, // Si tienes un módulo para modales adicionales
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient], // Cliente HTTP necesario para cargar traducciones
      },
      defaultLanguage: 'es', // Idioma predeterminado
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, // Estrategia de reutilización de rutas
  ],
  bootstrap: [AppComponent], // Componente raíz de la aplicación
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Para permitir elementos no reconocidos como 'ion-*'
})
export class AppModule {}
