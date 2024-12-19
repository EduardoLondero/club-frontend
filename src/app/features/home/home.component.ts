import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router) { }

  // Función que redirige al usuario a la página de registro
  redirectToRegister(): void {
    this.router.navigate(['/register']);
  }
  
}