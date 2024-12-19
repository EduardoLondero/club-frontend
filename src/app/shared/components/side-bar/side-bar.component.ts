import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  @Input() isOpen = false; // Hacer que isOpen sea una propiedad de entrada
  @Output() close = new EventEmitter<void>();
  
  // Inyectamos el Router
  constructor(private router: Router) {}

  toggleSideBar() {
    this.isOpen = !this.isOpen;
  }
  
  goToDeporte() {
    this.router.navigate(['/deporte']);
  }
  
  goToMembresias() {
    this.router.navigate(['/membresias']);
  }
  
  goToInscripciones() {
    this.router.navigate(['/inscripciones']);
  }
  
  goToCursos() {
    this.router.navigate(['/cursos']);
  }
  
  goToTareas() {
    this.router.navigate(['/tareas']);
  }
  
  goToNoticias() {
    this.router.navigate(['/noticias']);
  }

  closeSideBar() {
    this.isOpen = false;
    this.close.emit(); // Emitir evento cuando se cierre
  }
}