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
  @Input() chef: any = { name: '' }; 
  apiUrl = 'http://localhost:1337/api/chefs'; 

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
        this.modalCtrl.dismiss(true); 
      });
    } else {
      // Crear nuevo chef
      this.http.post(this.apiUrl, { data: { name: this.chef.name } }).subscribe(() => {
        
        this.modalCtrl.dismiss(true); 
      });
    }
  }

  translate(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
