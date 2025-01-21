import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalComponent } from './modal.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ModalComponent], // Declara el componente del modal
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule, // Asegúrate de importar IonicModule
  ],
  exports: [ModalComponent], // Exporta el componente para que otros módulos puedan usarlo
})
export class ModalModule {}
