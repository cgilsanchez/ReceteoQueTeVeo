import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RecipeDetailModalComponent } from './recipe-detail-modal.component';

    @NgModule({
    declarations: [RecipeDetailModalComponent],
    imports: [CommonModule, IonicModule],
    exports: [RecipeDetailModalComponent],
    })
    export class RecipeDetailModalModule {}
