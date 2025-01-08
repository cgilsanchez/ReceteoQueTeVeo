import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  usuario: any = {
    id: '',
    username: '',
    email: '',
  };

  constructor(
    private usuarioService: UsuarioService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarUsuario();
  }

  // Cargar datos del usuario autenticado
  cargarUsuario() {
    this.usuarioService.obtenerUsuarioAutenticado().subscribe(
      (data) => {
        this.usuario = data;
      },
      (error) => {
        console.error('Error al cargar los datos del usuario:', error);
      }
    );
  }

  // Abrir modal para editar un campo del usuario
  async editarCampo(campo: string) {
    const alert = await this.alertController.create({
      header: `Editar ${campo}`,
      inputs: [
        {
          name: campo,
          type: 'text',
          placeholder: `Nuevo ${campo}`,
          value: this.usuario[campo],
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            this.usuario[campo] = data[campo];
            this.actualizarUsuario();
          },
        },
      ],
    });

    await alert.present();
  }

  // Actualizar datos del usuario
  actualizarUsuario() {
    this.usuarioService.actualizarUsuario(this.usuario.id, this.usuario).subscribe(
      () => {
        alert('Datos actualizados correctamente');
      },
      (error) => {
        console.error('Error al actualizar los datos del usuario:', error);
        alert('Error al actualizar los datos');
      }
    );
  }
}
