import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from '../../service/translation.service';

@Component({
  selector: 'app-chef-modal',
  templateUrl: './chef-modal.component.html',
  styleUrls: ['./chef-modal.component.scss'],
})
export class ChefModalComponent {
  @Input() chef: any = { name: '' }; // Recibe el chef a editar o uno nuevo por defecto
  apiUrl = 'http://localhost:1337/api/chefs'; // URL de tu API en Strapi

  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
    private translationService: TranslationService
  ) {}

  close() {
    this.modalCtrl.dismiss(); // Cierra el modal sin devolver datos
  }

  saveChef() {
    if (this.chef.id) {
      // Actualizar chef existente
      this.http.put(`${this.apiUrl}/${this.chef.id}`, { data: { name: this.chef.name } }).subscribe(() => {
        this.modalCtrl.dismiss(true); // Devuelve un indicador de éxito
      });
    } else {
      // Crear nuevo chef
      this.http.post(this.apiUrl, { data: { name: this.chef.name } }).subscribe(() => {
        alert(this.translationService.getTranslation('CHEFS.NEW_CHEF'));
        this.modalCtrl.dismiss(true); // Devuelve un indicador de éxito
      });
    }
  }

  translate(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
