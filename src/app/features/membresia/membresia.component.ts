import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MembershipTypeService } from '../../services/membershipType.service';
import { AuthService } from '../../services/auth.service';
import { MembershipService } from '../../services/membership.service';
@Component({
  selector: 'app-membresia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.css']
})
export class MembresiaComponent implements OnInit {

  errorMessage: string | null = null;
  successMessage: string | null = null;
  membresias: any[] = []; 
  isAuthenticated: boolean = false;
  tieneMembresiaActiva: boolean = false;
  userId: number | null = null; 
  constructor(
    private authService: AuthService,
    private membershipService: MembershipService,
    private membershipTypeService: MembershipTypeService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    
    if (this.isAuthenticated) {
      const token = this.authService.getToken();
      if (token) {
        const decodedToken = this.authService.decodeToken(token);
        this.userId = decodedToken?.userId;

        if (this.userId) {
          this.verificarMembresiaActiva();
        }
      }
    }
    this.isAuthenticated = this.authService.isAuthenticated(); 
    this.loadMembershipTypes();
  }

  loadMembershipTypes(): void {
    this.membershipTypeService.getMembershipTypes().subscribe(
      (response) => {
        this.membresias = response.data.map((membresia: any) => ({
          ...membresia,
          beneficios: membresia.benefits ? membresia.benefits.split('\n') : [] 
        }));
      },
      (error) => {
        console.error('Error al obtener las membresías:', error);
      }
    );
  }

  inscribirse(membresia: any): void {
    if (!this.isAuthenticated) {
      alert('Debes iniciar sesión para inscribirte');
      return;
    }
  
    const token = this.authService.getToken();
  
    if (token === null) {
      alert('No se pudo obtener el token');
      return;
    }
  
    const decodedToken = this.authService.decodeToken(token);
  
    const userId = decodedToken?.userId;
  
    if (!userId) {
      alert('No se pudo obtener el ID de usuario');
      return;
    }
  
    console.log('User ID:', userId);
  
    const sportsIds: any[] = []; 
    const payments: any[] = []; 
  
    const today = new Date();
    const startDate = today.toLocaleDateString('es-AR', { year: 'numeric', month: '2-digit', day: '2-digit' })
      .split('/')
      .reverse()
      .join('-'); 
    
    const expireDate = new Date();
    expireDate.setUTCDate(expireDate.getUTCDate() + 30); 

    const endDate = null; 
  
    const membershipData = {
      userId,
      typeId: membresia.id,
      startDate,
      expireDate: expireDate.toISOString().split('T')[0], 
      endDate,
      sportsIds,
      payments
    };
  
    console.log(membershipData);
  
    this.membershipService.createMembership(membershipData).subscribe({
      next: (response) => {
        console.log('Membresía creada con éxito:', response);
        membresia.successMessage = response.message;
        membresia.errorMessage = '';
      },
      error: (error) => {
        console.error('Error al crear la membresía:', error);
        membresia.errorMessage = error.error.message || 'Hubo un problema al crear la membresía';
        membresia.successMessage = ''; 
      }
    });
}

  verificarMembresiaActiva(): void {
    const userId = this.authService.getUserId();
    if (!userId) return;
  
    this.membershipService.obtenerMembresiasUsuario(userId).subscribe({
      next: (membresias) => {
        const hoy = new Date().toISOString().split('T')[0];
  
        this.tieneMembresiaActiva = membresias.some(m => !m.endDate || new Date(m.endDate) > new Date());
      },
      error: (error) => {
        console.error('Error al verificar membresía activa:', error);
      }
    });
  }
  
}
