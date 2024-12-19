import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  navigateToHome() {
    this.router.navigate(['/home']); // Ruta de inicio
  }

  onDropdownClick(option: string): void {
    // Aquí puedes implementar lógica específica para cada opción desplegable
    console.log(`Seleccionaste: ${option}`);
    // Por ejemplo, redirigir a una página específica
    // this.router.navigate([`/${option}`]);
  }
}
