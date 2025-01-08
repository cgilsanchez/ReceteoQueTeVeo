import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor, revisa los campos.';
      return;
    }

    const { username, email, password } = this.registerForm.value;

    this.authService.register(username, email, password).subscribe(
      () => {
        this.router.navigate(['/login']); // Redirigir al login en caso de éxito
      },
      (error) => {
        console.error('Error al registrarse:', error);
        this.errorMessage = 'Hubo un problema al registrarte. Intenta nuevamente.';
      }
    );
  }
}
