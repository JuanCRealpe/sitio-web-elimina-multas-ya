import { Component, DoCheck, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements DoCheck {
  private authService = inject(AuthService);

  autenticado: boolean = false;

  ngDoCheck(): void {
    this.autenticado = this.authService.estaAutenticado();
  }
}