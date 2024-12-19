import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deporte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deporte.component.html',
  styleUrl: './deporte.component.css'
})
export class DeporteComponent {
deportes = [
    { nombre: 'Fútbol', descripcion: 'El deporte rey', imagen: 'https://via.placeholder.com/300x200?text=F%C3%BAtbol' },
    { nombre: 'Basketball', descripcion: 'Deporte de equipo con balón', imagen: 'https://via.placeholder.com/300x200?text=F%C3%BAtbol' },
    { nombre: 'Voleibol', descripcion: 'Deporte de equipo en la playa o pista', imagen: 'https://via.placeholder.com/300x200?text=F%C3%BAtbol'},
    { nombre: 'Tenis', descripcion: 'Deporte individual con raqueta', imagen: 'https://via.placeholder.com/300x200?text=F%C3%BAtbol' },
    { nombre: 'Natación', descripcion: 'Deporte acuático', imagen: 'https://via.placeholder.com/300x200?text=F%C3%BAtbol' },
    { nombre: 'Ciclismo', descripcion: 'Deporte de velocidad en bicicleta', imagen: 'https://via.placeholder.com/300x200?text=F%C3%BAtbol' },
    { nombre: 'Atletismo', descripcion: 'Deporte de carreras y saltos', imagen: 'https://via.placeholder.com/300x200?text=F%C3%BAtbol' },
    { nombre: 'Rugby', descripcion: 'Deporte de contacto con balón ovalado', imagen: 'https://via.placeholder.com/300x200?text=F%C3%BAtbol' },
    { nombre: 'Golf', descripcion: 'Deporte de precisión con palos', imagen: 'https://via.placeholder.com/300x200?text=F%C3%BAtbol' },
    { nombre: 'Boxeo', descripcion: 'Deporte de combate', imagen: 'https://via.placeholder.com/300x200?text=F%C3%BAtbol' }
  ];
  constructor(private router: Router) {}

  // Método para navegar hacia una página de detalles de un deporte o una lista completa
  goToDeporte() {
    this.router.navigate(['/deportes']); // Asegúrate de tener la ruta configurada en tu routing
  }

  // Método para inscribirse en un deporte
  inscribirse(deporteNombre: string) {
    console.log(`Inscribiéndose en ${deporteNombre}`);
    // Lógica para la inscripción (puede ser un formulario o llamada a una API)
  }
}