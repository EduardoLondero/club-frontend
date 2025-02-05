import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]] 
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe({
        next: (response: {token: string, username: string}) => {
          const token = response.token;
          if (token) {
            this.authService.setToken(token);
            localStorage.setItem('username', response.username);
            this.router.navigate(['/home']).then(() => {
              window.location.reload();

          }
            );
          }
        },
        error: (err:Error) => {
          this.loginError = 'Credenciales incorrectas. Intenta nuevamente.';
          console.error(err);
        }
      });
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToRecoverPassword() {
    this.router.navigate(['/recover-password']);
  }
}
