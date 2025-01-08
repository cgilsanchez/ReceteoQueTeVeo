import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.scss'],
})
export class ChefsComponent implements OnInit {
  chefs: any[] = [];
  apiUrl = 'http://localhost:1337/chefs'; // URL de tu endpoint en Strapi

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getChefs();
  }

  getChefs() {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this.chefs = data;
    });
  }

  openModal(chef: any | null = null) {
    const name = prompt(chef ? 'Editar nombre del chef:' : 'Agregar nombre del chef:', chef?.name || '');
    if (name) {
      chef ? this.updateChef(chef.id, name) : this.createChef(name);
    }
  }

  createChef(name: string) {
    this.http.post(this.apiUrl, { name }).subscribe(() => {
      alert('Chef creado');
      this.getChefs();
    });
  }

  updateChef(id: number, name: string) {
    this.http.put(`${this.apiUrl}/${id}`, { name }).subscribe(() => {
      alert('Chef actualizado');
      this.getChefs();
    });
  }

  deleteChef(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este chef?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
        alert('Chef eliminado');
        this.getChefs();
      });
    }
  }
}
