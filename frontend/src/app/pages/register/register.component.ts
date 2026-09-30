import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from "@angular/forms"
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

// ← NUEVO — validador que compara password y confirmPassword
function passwordsIgualesValidator(form: AbstractControl): ValidationErrors | null {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordsNoCoinciden: true };
}

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  cargando: boolean = false;
  mostrarPassword: boolean = false;
  mostrarConfirmPassword: boolean = false; // ← NUEVO

  form = this.fb.group({
    nombre: [
      "",
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],

    email: [
      "",
      [
        Validators.required,
        Validators.email
      ]
    ],

    edad: [
      "",
      [
        Validators.required,
        Validators.min(16)
      ]
    ],

    password: [
      "",
      [
        Validators.required,
        Validators.minLength(5)
      ]
    ],

    confirmPassword: [ // ← NUEVO
      "",
      [
        Validators.required
      ]
    ]
  }, { validators: passwordsIgualesValidator }) // ← NUEVO

  togglePassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  toggleConfirmPassword(): void { // ← NUEVO
    this.mostrarConfirmPassword = !this.mostrarConfirmPassword;
  }

  registrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this.cargando = true;

    // ← CAMBIADO: se excluye confirmPassword antes de enviar al backend
    const { confirmPassword, ...datosParaEnviar } = this.form.value;

    this.authService
      .registrar(datosParaEnviar as any)
      .subscribe({
        next: () => {
          this.cargando = false;
          Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: 'Usuario registrado correctamente',
            confirmButtonColor: '#28a745',
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(["/login"]);
          });
        },
        error: (error) => {
          this.cargando = false;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error?.msg || 'Error al registrar',
            confirmButtonColor: '#28a745'
          });
        }
      })
  }
}