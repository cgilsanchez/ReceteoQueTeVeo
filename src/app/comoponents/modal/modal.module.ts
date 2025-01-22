import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalComponent } from './modal.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ModalComponent], 
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  exports: [ModalComponent], 
})
export class ModalModule {}
