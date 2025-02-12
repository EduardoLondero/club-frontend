import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { UserService } from '../../services/user.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegisterComponent implements OnInit {
  user = {
    fullName: '',
    dni: '',
    email: '',
    numberPhone: '',
    address: '',
    sex: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
    province: '',
    locality: '',
    role:'2',
    membreships: [],
  };
  provinces: any[] = [];
  filteredLocalities: any[] = [];
  errorMessages: any;
  emailControl: any;
  errorMessage: any;

  

  constructor(private locationService: LocationService,
              private userService: UserService,
              private fb: FormBuilder) {}





formatDate(date: string): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');  
  return `${year}-${month}-${day}`;
}


  ngOnInit(): void {
    
    this.emailControl = this.fb.control('', [Validators.required, Validators.email]);
    this.locationService.getProvinces().subscribe(
      (response) => {
        this.provinces = response.data;
      },
      (error) => {
        console.error('Error fetching provinces:', error);
      }
    );
  }

  onProvinceChange(event: any): void {
    const provinceId = event.target.value;
    this.locationService.getLocalitiesByProvince(provinceId).subscribe(
      (response) => {
        this.filteredLocalities = response.data;
      },
      (error) => {
        console.error('Error fetching localities:', error);
      }
    );
  }

  onSubmit(registerForm: any): void {
    console.log(this.user);
  
    this.errorMessages = { email: '', password: '', confirmPassword: '' };

  
    if (registerForm.valid) {
      if (this.user.password !== this.user.confirmPassword) {
        this.errorMessages.confirmPassword = 'Las contraseñas no coinciden.';
        return;
      }
  
      if (!this.isEmailValid(String(this.user.email))) {
        console.log("Correo inválido", this.user.email);
        this.errorMessages.email = 'Correo electrónico inválido.';
        return;
      }
  
      const formattedBirthdate = this.formatDate(this.user.birthDate);
      this.user.birthDate = formattedBirthdate;
      this.user.role = '2';
  
      const userData = {
        fullName: this.user.fullName,
        dni: this.user.dni,
        email: this.user.email,
        numberPhone: this.user.numberPhone,
        address: this.user.address,
        sex: this.user.sex,
        birthDate: this.user.birthDate,
        password: this.user.password,
        province: this.user.province,
        locality: this.user.locality,
        role: this.user.role,
        memberships: []
      };
  
      this.userService.createUser(userData).subscribe({
        next: (response) => {
          console.log("Usuario creado exitosamente", response);
          registerForm.reset();
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Hubo un error al crear el usuario. Intenta de nuevo.';
          console.error('Error al crear usuario:', error);
        }
      });
    } else {
      console.log("Formulario inválido");
    }
  }
  

  isEmailValid(email: string): boolean {
    email = email.trim(); 
    console.log("Validando email:", email);
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }
  
  isValidDate(date: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  }

  setGender(gender: string): void {
    this.user.sex = gender;
  }
}