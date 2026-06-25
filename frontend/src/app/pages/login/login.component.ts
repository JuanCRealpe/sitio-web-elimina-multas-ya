import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms"
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  cargando: boolean = false;
  error: string = "";
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
            alert("Has iniciado sesion correctamente");
            console.log(respuesta);
            this.authService.guardarToken(respuesta.token);

            this.router.navigate(["/tasks"])
          },
          error: (error) => {
            this.cargando = false;
            this.error = error.error?.msg || "Error al iniciar sesión"
          }
        })
  }

}