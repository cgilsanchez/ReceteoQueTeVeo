import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChefModalComponent } from './chef-modal.component';

    @NgModule({
    declarations: [ChefModalComponent], // Declara el componente aquí
    imports: [
        CommonModule,
        FormsModule,
        IonicModule, // Importa IonicModule para que los componentes de Ionic sean reconocidos
    ],
    })
    export class ChefModalModule {}
