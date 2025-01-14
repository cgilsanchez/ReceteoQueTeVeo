import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChefPageRoutingModule } from './chef-routing.module';

import { ChefPage } from './chef.page';
import { ChefCardComponent } from 'src/app/comoponents/chef-card/chef-card.component';
  

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChefPageRoutingModule
  ],
  declarations: [ChefPage, ChefCardComponent],
})
export class ChefPageModule {}
