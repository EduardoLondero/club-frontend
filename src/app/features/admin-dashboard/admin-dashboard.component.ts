import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SportsService } from '../../services/sport.service';
import { PaymentService } from '../../services/payment.service';
import { MembershipService } from '../../services/membership.service';
import { FormsModule } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { MembershipTypeService } from '../../services/membershipType.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  sports: any[] = [];
  memberships: any[] = [];
  pagos: any[] = [];
  membershipTypes: any[] = [];
  selectedMembershipType: any;
  showDeleteModal: boolean = false;
  isConfirmingDelete: boolean = false;
  selectedOption:string = 'usuarios';
  message: string = ''; 
  showEditModal: boolean = false;  
  messageType: string = '';
  provinces: any[] = [];
  filteredLocalities: any[] = [];
  errorMessages: any = {};
  selectedUserId: number | null = null;
  selectedUserEmail: string = '';
  mostrarModal: boolean = false;
  selectedUser: any;
  typeToDelete: any;
  isCreating: boolean = false;
  selectedUserMemberships: any[] = [];
  mensajePago: string = '';
  tipoMensajePago: 'success' | 'error' = 'success';


  nuevoPago = {
    membershipId: null,
    totalPrice: null,
    state: 'Pendiente',
    payDay: '',
  };

  constructor(
    private userService: UserService,
    private sportService: SportsService,
    private paymentService: PaymentService,
    private membershipTypeService: MembershipTypeService,
    private locationService: LocationService,
    private membershipService: MembershipService
  ) {}

  ngOnInit(): void {

    this.locationService.getProvinces().subscribe(
      (response) => {
        this.provinces = response.data;
      },
      (error) => {
        console.error('Error fetching provinces:', error);
      }
    );

    this.loadUsers();
    this.loadAllMemberships();
    this.loadMembershipTypes();
    this.loadPagos();
  }

  onProvinceChange(event: any): void {
    const provinceId = +event.target.value; 
    this.selectedUser.province = provinceId;
    this.loadLocalities(provinceId);
  }
  
  isEmailValid(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }

  isValidDate(date: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  }

  setGender(gender: string) {
    this.selectedUser.sex = gender;
  }

  
  loadUsers(): void {
    this.userService.getUsers().subscribe(response => {
      const message = response.message;
      const data = response.data;
  
      if (data && Array.isArray(data)) {
        this.users = data; 
        console.log('Usuarios cargados:', this.users);
      } else {
        this.showMessage(0, message, 'error'); 
      }
    }, error => {
      this.showMessage(0, 'Error al cargar los usuarios', 'error');
    });
  }
  

  editUser(user: any): void {
    const usuario = this.selectedUser = { ...user };
    const { memberships, ...usuarioSinMembresias } = usuario; 
    if (usuarioSinMembresias.role) {
      usuarioSinMembresias.role = usuarioSinMembresias.role.id;
    }
    this.selectedUser = usuarioSinMembresias; 
    console.log('Usuario seleccionado para editar:', this.selectedUser);
    
    if (this.selectedUser.birthDate) {
      this.selectedUser.birthDate = this.formatDate(this.selectedUser.birthDate);
    }

    if (user.locality) {
      this.selectedUser.locality = user.locality.id; 
      this.selectedUser.province = user.locality.province;
  
      this.loadLocalities(this.selectedUser.province);
    }
  }


  loadLocalities(provinceId: number): void {
    if (!provinceId) {
      this.filteredLocalities = [];
      return;
    }
  
    this.locationService.getLocalitiesByProvince(provinceId).subscribe(
      (response) => {
        this.filteredLocalities = response.data || [];
  
        setTimeout(() => {
          if (this.selectedUser.locality) {
            const exists = this.filteredLocalities.some(loc => loc.id === this.selectedUser.locality);
            if (!exists) {
              this.selectedUser.locality = '';
            }
          }
        }, 200);
      },
      (error) => {
        console.error('Error al obtener localidades:', error);
      }
    );
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; 
  }
  

  loadProvinceAndLocality(locality: any): void {
    if (!locality) return;
  
    this.selectedUser.province = locality.province?.id || ''; 
  
    this.onProvinceChange({ target: { value: this.selectedUser.province } });
  
    setTimeout(() => {
      this.selectedUser.locality = locality.id || '';
    }, 100);
  }

  saveUser(): void {
    
    if (!this.selectedUser?.id) {
      console.error("No se puede actualizar: ID de usuario no encontrado");
      return;
    }
  
    this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(
      (response) => {
        console.log("Usuario actualizado exitosamente", response);
        console.log('Usuario seleccionado para guardar:', this.selectedUser);
        this.selectedUser = null;
        window.location.reload();
      },
      (error) => {
        console.error('Error al actualizar usuario', error);
      }
    );
  }

   cancelEdit(): void {
    this.selectedUser = null; 
    this.showEditModal = false;
  }

  showMessage(userId: number, message: string, type: string): void {
    this.users = this.users.map(user => {
      if (user.id === userId) {
        return { ...user, message: { text: message, type: type } };
      }
      return user;
    });
  }

  clearMessage(): void {
    this.message = '';
    this.messageType = '';
  }
  setActiveTab(option: string) {

    this.selectedOption = option;
    console.log('Opcion seleccionada:', option);
    if (option === 'usuarios') {
      this.loadUsers();
      console.log('Opcion:', option);
    }
}

loadMembershipTypes() {
  this.membershipTypeService.getMembershipTypes().subscribe(response => {
    this.membershipTypes = response.data;
  });
}

confirmDeleteMembershipType(membershipType: any) {
  if (membershipType.memberships.length > 0) {
    alert('Este tipo de membresía no se puede eliminar porque tiene membresías asociadas.');
  } else {
    this.selectedMembershipType = membershipType;
    this.isConfirmingDelete = true;
  }
}

cancelDelete() {
  this.isConfirmingDelete = false;
  this.showDeleteModal = false;
}

deleteMembershipType() {
  this.membershipTypeService.deleteMembershipType(this.selectedMembershipType.id).subscribe(response => {
    this.loadMembershipTypes();
    this.showDeleteModal = false;
  });
}

editMembershipType(membershipType: any) {
  const { memberships, ...membershipTypeWithoutMembers } = membershipType;
  this.selectedMembershipType = { ...membershipTypeWithoutMembers };
  console.log('Tipo de membresía seleccionado para editar:', JSON.stringify(this.selectedMembershipType, null, 2));
  this.showEditModal = true;
}

saveMembershipType() {

  if (this.isCreating) {
    this.createMembershipType();
  }

  else {
    this.membershipTypeService.updateMembershipType(this.selectedMembershipType.id,this.selectedMembershipType).subscribe(response => {
     this.showEditModal = false;
     this.loadMembershipTypes();
   });
  }
  
}

createMembershipType() {
  this.membershipTypeService.createMembershipType(this.selectedMembershipType).subscribe(response => {
    this.loadMembershipTypes();

    this.showEditModal = false;
    this.isCreating = false;
  });
}

openCreateMembershipModal() {
  this.selectedMembershipType = {
    description: '',
    price: null,
    benefits: '',
    requirements: '',
    memberships: [],
  };
  this.isCreating = true;
  this.showEditModal = true;
}


  confirmDelete(type: any): void {
    this.selectedMembershipType = type;
    this.showDeleteModal = true;
  }


  loadAllMemberships(): void {
    this.membershipService.getAllMemberships().subscribe(
      (response: any) => {
        console.log('Membresías cargadas:', response);
        this.memberships = (response as { data: any[] }).data;
      },
      error => {
        console.error('Error al obtener las membresías:', error);
      }
    );
  }

  loadUserPayments(userId: number): void {
    this.membershipService.obtenerMembresiasUsuario(userId).subscribe(memberships => {
      if (!memberships || memberships.length === 0) {
        console.log('El usuario no tiene membresías.');
        this.pagos = [];
        return;
      }
  
      console.log('Membresías obtenidas:', memberships);
  
      this.pagos = memberships.flatMap(membership =>
        (membership.payments || []).map((payment: any) => ({
          ...payment,
          membership: membership 
        }))
      );
  
      console.log('Pagos cargados:', this.pagos);
    }, error => {
      console.error('Error al obtener las membresías:', error);
    });
  }
  
  

  loadPagos() {
    this.paymentService.getAllPayments().subscribe(response => {
      this.pagos = response.data;
      console.log('Pagos cargados:', this.pagos);
    });
  }


  crearPago() {
    const nuevoPago = {
      ...this.nuevoPago,
      membership: this.nuevoPago.membershipId,
      totalPrice: this.nuevoPago.totalPrice,
      state: this.nuevoPago.state,
      payDay: this.nuevoPago.payDay
    };

    this.paymentService.createPayment(nuevoPago).subscribe({
      next: response => {
        this.mensajePago = 'Pago creado con éxito';
        this.tipoMensajePago = 'success';
        this.cerrarModalPago();
        this.loadPagos();
      },
      error: err => {
        this.mensajePago = 'Error al crear el pago. Inténtalo nuevamente.';
        this.tipoMensajePago = 'error';
      }
    });
}


  onUserSelect(): void {
    if (this.selectedUserId !== null) {
      this.membershipService.obtenerMembresiasUsuario(this.selectedUserId).subscribe(memberships => {
        this.selectedUserMemberships = memberships.filter(membership => !membership.endDate);
        console.log('Membresías activas del usuario:', this.selectedUserMemberships);
      });
    }
  }



    abrirModalPago() {
      this.mostrarModal = true;
    }
  
    cerrarModalPago() {
      this.mostrarModal = false;
    }

    

}
