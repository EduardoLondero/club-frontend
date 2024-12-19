import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Aquí puedes manejar la autenticación
      console.log('Formulario enviado', this.loginForm.value);
    } else {
      this.loginError = 'Por favor, completa todos los campos.';
    }
  }

  // Función para redirigir al formulario de registro
  goToRegister() {
    this.router.navigate(['/register']);
  }

  // Función para redirigir al formulario de recuperación de contraseña
  goToRecoverPassword() {
    this.router.navigate(['/recover-password']);
  }
}