import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ModalModule } from './comoponents/modal/modal.module'; // Asegúrate de que la ruta sea correcta
import { FormsModule } from '@angular/forms';
import { ChefModalComponent } from './comoponents/chef-modal/chef-modal.component';




@NgModule({
  declarations: [AppComponent,ChefModalComponent ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    ModalModule,
    FormsModule, // Agrega el módulo del modal
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
