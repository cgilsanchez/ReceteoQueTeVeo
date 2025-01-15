import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RecetasPageRoutingModule } from './recetas-routing.module';
import { RecetasPage } from './recetas.page';
import { RecipeCardModule } from '../../comoponents/recipe-card/recipe-card.module';
import { RecipeDetailModalComponent } from '../../comoponents/recipe-detail-modal/recipe-detail-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecetasPageRoutingModule,
    RecipeCardModule, 
  ],
  declarations: [RecetasPage, RecipeDetailModalComponent], // Declara el modal aquí
})
export class RecetasPageModule {}

