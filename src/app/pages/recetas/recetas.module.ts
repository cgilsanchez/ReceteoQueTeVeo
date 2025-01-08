import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RecetasPageRoutingModule } from './recetas-routing.module';
import { RecetasPage } from './recetas.page';
import { RecipeCardModule } from '../../comoponents/recipe-card/recipe-card.module'; // Ajusta la ruta si es necesario

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecetasPageRoutingModule,
    RecipeCardModule, // Importa el módulo aquí
  ],
  declarations: [RecetasPage], // Declara la página de recetas
})
export class RecetasPageModule {}


