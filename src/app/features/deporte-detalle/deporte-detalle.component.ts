import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SportsService } from '../../services/sport.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MembershipService } from '../../services/membership.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-deporte-detalle',
  templateUrl: './deporte-detalle.component.html',
  styleUrls: ['./deporte-detalle.component.css'],
  standalone: true,
  imports: [CommonModule] 
})
export class DeporteDetalleComponent implements OnInit {
  deporte: any;
  activeMembershipId: number | null = null;
  userId: number | null = null;  
  activeMembership: any = null;
  errorMessage: string | null = null; 
  successMessage: string | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private sportsService: SportsService,
    private membershipService: MembershipService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const nombre = this.route.snapshot.paramMap.get('nombre');
    if (nombre) {
      console.log('Nombre del deporte desde la URL:', nombre);
  
      this.sportsService.getDeporteByNombre(nombre).subscribe(
        (response) => {
          if (response.data && response.data.length > 0) {

            this.deporte = response.data[0];
            
            if (!this.deporte) {
              console.error('No se encontró el deporte:', nombre);
            } else {
              console.log('Deporte encontrado:', this.deporte);
            }
          } else {
            console.error('No se encontraron deportes en la respuesta');
          }
        },
        (error) => {
          console.error('Error al obtener los detalles del deporte:', error);
        }
      );
    } else {
      console.error('No se proporcionó un nombre válido de deporte en la URL.');
    }
      this.userId = this.authService.getUserId();

      if (this.userId) {
        this.membershipService.obtenerMembresiasUsuario(this.userId).subscribe(
          (membresias) => {
            console.log('Membresias:', membresias);
            this.activeMembership = membresias.find(
              (membership) => membership.endDate === null
            );
            if (!this.activeMembership) {
              console.error('No tienes una membresía activa');
            }
          },
          (error) => {
            console.error('Error al obtener las membresías:', error);
        }
      );
    }
  }
  


  onInscribirse(): void {
    if (this.userId && this.activeMembership) {
      const sportId = this.deporte.id;
      const membershipId = this.activeMembership.id;
  
      const sportIdNumber = Number(sportId);
      const membershipIdNumber = Number(membershipId);
  
      if (isNaN(sportIdNumber) || isNaN(membershipIdNumber)) {
        this.errorMessage = 'Los IDs proporcionados no son válidos.';
        return;
      }
  
      this.sportsService.inscribirDeporte(sportIdNumber, membershipIdNumber).subscribe(
        (response) => {
          console.log('Inscripción exitosa:', response);
          this.successMessage = '¡Te has inscrito exitosamente al deporte!'; 
          this.errorMessage = ''; 
        },
        (error) => {
          console.error('Error al inscribirse:', error);
          console.log('Numero de ID del deporte', sportIdNumber, 'Numero de ID de membresia', membershipIdNumber);
  
          this.errorMessage = error.error.message || 'Hubo un error al intentar inscribirse en el deporte.';
          this.successMessage = ''; 
        }
      );
    } else {
      this.errorMessage = 'No tienes una membresía activa.';
      this.successMessage = ''; 
    }
  }
  
}