import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { TranslationService } from '../../service/translation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  showPassword: boolean = false;
  showSplash: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public translationService: TranslationService
  ) {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.errorMessage = this.translationService.getTranslation('LOGIN.ERROR_INVALID_CREDENTIALS');

      return;
    }

    const { identifier, password } = this.loginForm.value;

    this.authService.login(identifier, password).subscribe(
      async (response) => {
        console.log('Inicio de sesión exitoso:', response);
        await this.authService.setToken(response.jwt);
        this.errorMessage = null;

        this.showSplash = true;
        setTimeout(() => {
          this.showSplash = false;
          this.router.navigate(['/recetas']);
        }, 3000);
      },
      () => {
        this.errorMessage = this.translationService.getTranslation('LOGIN.ERROR_INVALID_CREDENTIALS');

      }
    );
  }
}
