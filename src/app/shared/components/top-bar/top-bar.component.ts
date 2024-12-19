import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();  // EventEmitter para abrir/cerrar el sidebar

  constructor(private router: Router) {}

  // Función para emitir el evento que abre o cierra el side bar
  onToggleSidebar() {
    this.toggleSidebar.emit();  // Usamos .emit() para emitir el evento
  }

  // Función para navegar a la página principal
  goHome() {
    this.router.navigate(['/']);  // Navega a la página principal
  }

  // Función para navegar a la página de login
  goToLogin() {
    this.router.navigate(['/login']);  // Navega a la página de login
  }
}
