import { Component, DoCheck, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements DoCheck {
  private authService = inject(AuthService);
  private router = inject(Router);

  autenticado: boolean = false;
  admin: boolean = false;
  nombreUsuario: string | null = null;
  enPaginaLogin: boolean = false;
  enHome: boolean = false;

  ngDoCheck(): void {
    const ruta = this.router.url.split(/[?#]/)[0];

    this.autenticado = this.authService.estaAutenticado();
    this.admin = this.authService.esAdmin();
    this.nombreUsuario = this.authService.obtenerNombre();
    this.enPaginaLogin = ruta === '/login';
    this.enHome = ruta === '/';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}