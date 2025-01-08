import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RecipeCardComponent } from './recipe-card.component';

@NgModule({
  declarations: [RecipeCardComponent], // Declara el componente
  imports: [CommonModule, IonicModule], // Importa los módulos necesarios
  exports: [RecipeCardComponent], // Exporta el componente para que otros módulos puedan usarlo
})
export class RecipeCardModule {}
