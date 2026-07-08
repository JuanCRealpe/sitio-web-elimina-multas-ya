import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Course } from '../interfaces/course';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private http = inject(HttpClient);
    private api = environment.apiUrl;

    obtenerCourses(): Observable<any> {
        return this.http.get(`${this.api}/courses/obtenerCourses`);
    }

    crearCourse(formData: FormData): Observable<any> {
        return this.http.post(`${this.api}/courses/crearCourse`, formData);
    }

    actualizarCourse(id: string, formData: FormData): Observable<any> {
        return this.http.put(`${this.api}/courses/actualizarCourse/${id}`, formData);
    }

    eliminarCourse(id: string): Observable<any> {
        return this.http.delete(`${this.api}/courses/eliminarCourse/${id}`);
    }
}