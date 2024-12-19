import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegisterComponent {
  // Modelo para el usuario
  user = {
    name: '',
    email: '',
    numberPhone: '',
    address: '',
    password: '',
    confirmPassword: '',
  };

  // Función que se ejecuta al enviar el formulario
  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Formulario enviado:', this.user);
      // Aquí puedes agregar la lógica para enviar los datos al backend

      // Por ejemplo, puedes hacer una llamada HTTP para registrar el usuario.
      // this.userService.registerUser(this.user).subscribe(response => {
      //   console.log('Usuario registrado con éxito', response);
      // });
    } else {
      console.log('Formulario inválido');
    }
  }
}
