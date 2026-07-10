import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StepService {
    private http = inject(HttpClient);
    private api = environment.apiUrl;

    obtenerStepsPorCurso(courseId: string): Observable<any> {
        return this.http.get(`${this.api}/steps/obtenerSteps/${courseId}`);
    }

    crearStep(datos: FormData): Observable<any> {
        return this.http.post(`${this.api}/steps/crearStep`, datos);
    }

    agregarBloque(stepId: string, datos: FormData): Observable<any> {
        return this.http.put(`${this.api}/steps/agregarBloque/${stepId}`, datos);
    }

    actualizarBloque(stepId: string, bloqueId: string, datos: FormData): Observable<any> {
        return this.http.put(`${this.api}/steps/actualizarBloque/${stepId}/${bloqueId}`, datos);
    }

    actualizarStep(stepId: string, datos: FormData): Observable<any> { // ← NUEVO
        return this.http.put(`${this.api}/steps/actualizarStep/${stepId}`, datos);
    }

    eliminarBloque(stepId: string, bloqueId: string): Observable<any> {
        return this.http.delete(`${this.api}/steps/eliminarBloque/${stepId}/${bloqueId}`);
    }

    eliminarStep(stepId: string): Observable<any> {
        return this.http.delete(`${this.api}/steps/eliminarStep/${stepId}`);
    }
}