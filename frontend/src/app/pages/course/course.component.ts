import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { Course } from '../../interfaces/course';
import Swal from 'sweetalert2'; // ← NUEVO
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CoursesComponent implements OnInit {
  private courseService = inject(CourseService);

  courses: Course[] = [];
  cargando: boolean = false;

  ngOnInit(): void {
    this.cargando = true;

    this.courseService.obtenerCourses().subscribe({
      next: (res) => {
        this.courses = res.courses;
        this.cargando = false;
      },
      error: (error) => {
        this.cargando = false;
        Swal.fire({                          // ← CAMBIADO
          icon: 'error',
          title: 'Error',
          text: error.error?.msg || 'Error al obtener los cursos',
          confirmButtonColor: '#28a745'
        });
      }
    });
  }
}