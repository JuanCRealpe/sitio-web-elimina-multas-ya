import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private http = inject(HttpClient);
    private api = environment.apiUrl;

    crearPago(): Observable<any> {
        return this.http.get(`${this.api}/payment/crearPago`);
    }

    verificarSuscripcion(): Observable<any> {
        return this.http.get(`${this.api}/payment/verificarSuscripcion`);
    }
}