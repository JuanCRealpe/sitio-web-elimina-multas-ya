import { CommonModule } from '@angular/common';
import { Component, DoCheck, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements DoCheck {
  private authService = inject(AuthService);
  private router = inject(Router);

  autenticado: boolean = false;

  ngDoCheck(): void {
    this.autenticado = this.authService.estaAutenticado();
  }

  logout(): void {
    this.authService.logout();

    this.router.navigate(["/login"])
  }

}
