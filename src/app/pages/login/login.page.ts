import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, revisa los campos.';
      return;
    }

    const { identifier, password } = this.loginForm.value;

    this.authService.login(identifier, password).subscribe(
      async (response) => {
        await this.authService.setToken(response.jwt); // Guardar el token en Storage
        this.errorMessage = null; // Limpiar mensaje de error en caso de éxito
        this.router.navigate(['/recetas']); // Redirigir al listado de recetas
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';
      }
    );
  }
}
