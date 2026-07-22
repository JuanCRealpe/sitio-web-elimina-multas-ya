import { Inject, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private api = environment.apiUrl;

  registrar(usuario: User) : Observable<any> {
    return this.http.post(
      `${ this.api }/auth/registrar`,
      usuario 
    )
  }

  login(credenciales: Pick<User, "email" | "password">) : Observable<any> {
    return this.http.post(
      `${ this.api }/auth/login`,
      credenciales
    )
  }

  guardarToken(token: string): void {
    sessionStorage.setItem("token", token);
  }

  estaAutenticado(): boolean {
    const token = sessionStorage.getItem('token')
    if(token) {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }

  guardarRole(role: string): void {        // ← NUEVO
    sessionStorage.setItem("role", role);
  }

  esAdmin(): boolean {                     // ← NUEVO
    const role = sessionStorage.getItem("role");
    return role === "admin";
  }

  guardarSuscripcion(activa: boolean): void {
    sessionStorage.setItem("suscripcion", activa ? "true" : "false");
  }

  tieneSuscripcion(): boolean {
    return sessionStorage.getItem("suscripcion") === "true";
  }

}

