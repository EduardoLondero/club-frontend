import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MembershipService } from '../../services/membership.service';

@Component({
  selector: 'app-manage-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})

export class ManageProfileComponent implements OnInit {
  
  selectedOption: string = 'datos'; 
  userForm!: FormGroup;
  userId: number | null = null;
  user: any = {}; 
  payments: any[] = [];
  memberships: any[] = []; 
  sports: any[] = []; 
  membershipToCancel: number | null = null; 
  successMessage: string | null = null;
  errorMessage: string | null = null;

  
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private membershipService: MembershipService
  ) {}

  ngOnInit(): void {

    this.userId = this.authService.getUserId();

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadUserData();
    this.loadMemberships();
    
    this.userForm = this.fb.group({
      fullName: [{ value: '', disabled: true }],
      dni: [{ value: '', disabled: true }],
      email: ['', [Validators.required, Validators.email]],
      numberPhone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.minLength(5)],
      birthDate: [{ value: '', disabled: true }],
      sex: ['']
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    
    return password && confirmPassword && password === confirmPassword ? null : { notMatching: true };
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    if (option === 'pagos') {
      this.getPayments();
    }
  }

  loadUserData(): void {
    const token = this.authService.getToken();
    
    if (token) {
      const decodedToken = this.authService.decodeToken(token);
  
      if (decodedToken && decodedToken.userId) {
        console.log('Token decodificado:', decodedToken);
        this.userService.getUserProfile(decodedToken.userId).subscribe({
          next: (response) => {
            if (response.data) {
              this.user = response.data;
              this.userForm.patchValue({
                fullName: this.user.fullName,
                dni: this.user.dni,
                email: this.user.email,
                numberPhone: this.user.numberPhone,
                address: this.user.address,
                birthDate: this.user.birthDate.split('T')[0], 
                sex: this.user.sex
              });
              console.log('Datos del usuario cargados:', this.user);
            } else {
              console.error('La respuesta del servidor no contiene datos del usuario');
            }
          },
          error: (error) => {
            console.error('Error al cargar los datos del usuario:', error);
          }
        });
      } else {
        console.error('Token inválido o no contiene userId');
      }
    } else {
      console.error('No se pudo obtener el token');
    }
  }

  sportToDelete: { membershipId: number, sportId: number } | null = null; 

  showConfirmRemoveSport(membershipId: number, sportId: number): void {
    this.sportToDelete = { membershipId, sportId };
  }

showConfirmCancel(membershipId: number): void {
  this.membershipToCancel = membershipId;
}

cancelCancelMembership(): void {
  this.membershipToCancel = null;
}

  cancelRemoveSport(): void {
    this.sportToDelete = null;
  }


  cancelMembership(membershipId: number): void {
    this.membershipService.cancelMembership(membershipId).subscribe(
      (response) => {
        this.memberships = this.memberships.map(m => 
          m.id === membershipId ? { ...m, endDate: new Date().toISOString() } : m
        );
        const successMessage = response.message || 'Membresía cancelada con éxito.';
        this.showMessage(membershipId, successMessage, 'success');
      },
      (error) => {
        console.error('Error al cancelar membresía:', error);
        const errorMessage = error.error?.message || 'Hubo un error al cancelar la membresía.';
        this.showMessage(membershipId, errorMessage, 'error');
      }
    );
    this.membershipToCancel = null;
  }
  
  showMessage(membershipId: number, message: string, type: string): void {
    this.memberships = this.memberships.map(m => {
      if (m.id === membershipId) {
        return { ...m, message: { text: message, type: type } };
      }
      return m;
    });
  }
  
  removeSportFromMembership(membershipId: number, sportId: number): void {
    this.membershipService.removeSport(membershipId, sportId).subscribe(
      (response) => {
        this.memberships = this.memberships.map(m => {
          if (m.id === membershipId) {
            return { ...m, sports: m.sports.filter((s: { id: number; }) => s.id !== sportId) };
          }
          return m;
        });
        const successMessage = response.message || 'Deporte eliminado de la membresía.';
        this.showMessage(membershipId, successMessage, 'success');
      },
      (error) => {
        console.error('Error al eliminar deporte:', error);
        const errorMessage = error.error?.message || 'Hubo un error al eliminar el deporte de la membresía.';
        this.showMessage(membershipId, errorMessage, 'error');
      }
    );
  }
  
  updateUser(): void {
    if (this.userForm.invalid) return;
  
    const { password, confirmPassword, ...updatedData } = this.userForm.value;
  
    const token = this.authService.getToken();
    if (token) {
      const decodedToken = this.authService.decodeToken(token);
      if (decodedToken && decodedToken.userId) {
        const userId = decodedToken.userId;
  
        if (password && password !== confirmPassword) {
          this.errorMessage = 'Las contraseñas no coinciden';
          return;
        }

        if (password) {
          updatedData.password = password;
        }
  
        this.userService.updateUser(userId, updatedData).subscribe({
          next: () => {
            this.successMessage = 'Datos actualizados correctamente';
            this.errorMessage = null; 
          },
          error: (err) => {
            console.error('Error al actualizar el perfil:', err);
            this.errorMessage = err.error.message || 'Hubo un error al actualizar los datos';
            this.successMessage = null; 
          }
        });
      }
    }
  }

  getPayments(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.membershipService.obtenerMembresiasUsuario(userId).subscribe({
        next: (memberships) => {
          this.payments = []; 
          memberships.forEach((membership) => {
            if (membership.payments && membership.payments.length > 0) {
              this.payments.push(...membership.payments);
            }
          });
        },
        error: (err) => {
          console.error('Error al obtener las membresías o pagos:', err);
        },
      });
    }
  }



  loadMemberships(): void {
    this.membershipService.obtenerMembresiasUsuario(this.userId!).subscribe(
      (data) => {
        this.memberships = data;
        console.log('Membresías cargadas:', this.memberships);
      },
      (error) => {
        console.error('Error al cargar membresías:', error);
      }
    );
  }
}