import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChefService } from '../../service/chefs.service';
import { ChefModalComponent } from '../../comoponents/chef-modal/chef-modal.component';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.page.html',
  styleUrls: ['./chef.page.scss'],
})
export class ChefPage {
  chefs: any[] = [];

  constructor(private chefService: ChefService, private modalCtrl: ModalController) {}

  ionViewWillEnter() {
    this.loadChefs();
  }

  loadChefs() {
    this.chefService.getChefs().subscribe({
      next: (res) => {
        this.chefs = res.data.map((item: any) => ({
          id: item.id,
          ...item.attributes,
        }));
      },
      error: (err) => console.error('Error al cargar chefs:', err),
    });
  }

  async openModal(chef: any = null) {
    const modal = await this.modalCtrl.create({
      component: ChefModalComponent,
      componentProps: {
        chef: chef ? { ...chef } : { name: '' }, // Pasamos los datos del chef si se va a editar
      },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadChefs(); // Recargamos la lista después de crear/editar un chef
      }
    });

    return await modal.present();
  }

  deleteChef(id: number) {
    this.chefService.deleteChef(id).subscribe({
      next: () => this.loadChefs(),
      error: (err) => console.error('Error al eliminar chef:', err),
    });
  }
}
