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
  error: string = "";
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
    ]
  })

  registrar() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this.cargando = true;

    this.authService
        .registrar(this.form.value as any)
        .subscribe({
          next: () => {
            this.cargando = false;
            alert("Usuario registrado correctamente")

            this.router.navigate(["/login"])
          },
          error: (error) => {
            this.cargando = false;
            this.error = error.error?.msg || "Error al registrar"
          }
        })
  }

}
