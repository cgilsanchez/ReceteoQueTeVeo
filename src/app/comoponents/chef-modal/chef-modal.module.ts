import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChefModalComponent } from './chef-modal.component';

    @NgModule({
    declarations: [ChefModalComponent], 
    imports: [
        CommonModule,
        FormsModule,
        IonicModule, 
    ],
    })
    export class ChefModalModule {}
