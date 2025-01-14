import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChefService } from '../../service/chefs.service';
import { ChefModalComponent } from '../../comoponents/chef-modal/chef-modal.component';


@Component({
  selector: 'app-chef',
  templateUrl: './chef.page.html',
  styleUrls: ['./chef.page.scss'],
})
export class ChefPage implements OnInit {
  chefs: any[] = []; // Lista de chefs

  constructor(private chefService: ChefService, private modalCtrl: ModalController) {}

  ngOnInit(): void {
    this.loadChefs();
  }

  // Cargar todos los chefs
  loadChefs(): void {
    this.chefService.getChefs().subscribe((res) => {
      this.chefs = res.data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
      }));
    });
  }

  // Abrir el modal para agregar o editar un chef
  async openModal(chef: any | null = null): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ChefModalComponent,
      componentProps: {
        chef: chef ? { ...chef } : { name: '' }, // Chef para editar o nuevo
      },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        chef ? this.updateChef(chef.id, result.data) : this.createChef(result.data);
      }
    });

    return await modal.present();
  }

  // Crear un chef
  createChef(data: { name: string }): void {
    this.chefService.createChef(data).subscribe(() => {
      this.loadChefs();
    });
  }

  // Actualizar un chef
  updateChef(id: number, data: { name: string }): void {
    this.chefService.updateChef(id, data).subscribe(() => {
      this.loadChefs();
    });
  }

  // Eliminar un chef
  deleteChef(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este chef?')) {
      this.chefService.deleteChef(id).subscribe(() => {
        this.loadChefs();
      });
    }
  }
}
