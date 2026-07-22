import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms"
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PaymentService } from '../../services/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb             = inject(FormBuilder);
  private authService    = inject(AuthService);
  private paymentService = inject(PaymentService);
  private router         = inject(Router);

  cargando: boolean = false;
  form = this.fb.nonNullable.group({
    email: [
      "",
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      "",
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ]
  })

  iniciarSesion() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando = true;

    this.authService
    .login(this.form.getRawValue())
        .subscribe({
          next: (respuesta) => {
            this.cargando = false;
            this.authService.guardarToken(respuesta.token);
            this.authService.guardarRole(respuesta.role);

            if (respuesta.role === 'admin') { // ← NUEVO admin va directo
              Swal.fire({
                icon: 'success',
                title: '¡Bienvenido!',
                text: 'Has iniciado sesión correctamente',
                confirmButtonColor: '#28a745',
                timer: 1500,
                showConfirmButton: false
              }).then(() => {
                this.router.navigate(['/course']);
              });
              return; // ← NUEVO
            }

            this.paymentService.verificarSuscripcion().subscribe({ // ← solo usuarios normales
              next: (res) => {
                this.authService.guardarSuscripcion(res.activa);
                Swal.fire({
                  icon: 'success',
                  title: '¡Bienvenido!',
                  text: 'Has iniciado sesión correctamente',
                  confirmButtonColor: '#28a745',
                  timer: 1500,
                  showConfirmButton: false
                }).then(() => {
                  if (res.activa) {
                    this.router.navigate(['/course']);
                  } else {
                    this.router.navigate(['/payment']);
                  }
                });
              },
              error: () => {
                this.authService.guardarSuscripcion(false);
                this.router.navigate(['/payment']);
              }
            });
          },
          error: (error) => {
            this.cargando = false;
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.error?.msg || 'Error al iniciar sesión',
              confirmButtonColor: '#28a745'
            });
          }
        })
  }
}