import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { TogglePasswordPipe } from 'src/app/pipe/password.pipe';
import { SplashComponent } from '../../comoponents/splash/splash.component'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
  ],
  declarations: [LoginPage, TogglePasswordPipe, SplashComponent], 
})
export class LoginPageModule {}
