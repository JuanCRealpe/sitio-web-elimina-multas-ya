import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { Course } from '../../interfaces/course';
import Swal from 'sweetalert2'; // ← NUEVO

@Component({
  selector: 'app-admin',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  private courseService = inject(CourseService);
  private fb = inject(FormBuilder);

  courses: Course[] = [];
  imagenSeleccionada: File | null = null;
  modoEdicion: boolean = false;
  cursoEditandoId: string = '';

  form = this.fb.group({
    title:       ['', Validators.required],
    description: ['', Validators.required],
    category:    ['', Validators.required]
  });

  ngOnInit(): void {
    this.cargarCourses();
  }

  cargarCourses(): void {
    this.courseService.obtenerCourses().subscribe({
      next: (res) => this.courses = res.courses,
      error: () => Swal.fire({  
        icon: 'error', 
        title: 'Error', 
        text: 'Error al cargar cursos', 
        confirmButtonColor: '#28a745' }) // ← CAMBIADO
    });
  }

  onImagenSeleccionada(event: any): void {
    this.imagenSeleccionada = event.target.files[0];
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('title',       this.form.value.title!);
    formData.append('description', this.form.value.description!);
    formData.append('category',    this.form.value.category!);
    if (this.imagenSeleccionada) {
      formData.append('image', this.imagenSeleccionada);
    }

    if (this.modoEdicion) {
      this.courseService.actualizarCourse(this.cursoEditandoId, formData).subscribe({
        next: () => {
          Swal.fire({ 
            icon: 'success', 
            title: 'Actualizado',  
            text: 'Curso actualizado correctamente', 
            confirmButtonColor: '#28a745', timer: 1500, 
            showConfirmButton: false }); // ← CAMBIADO
          this.resetForm();
          this.cargarCourses();
        },
        error: () => Swal.fire({ 
          icon: 'error', 
          title: 'Error', 
          text: 'No se pudo actualizar el curso', 
          confirmButtonColor: '#28a745' }) // ← CAMBIADO
      });
    } else {
      this.courseService.crearCourse(formData).subscribe({
        next: () => {
          Swal.fire({ 
            icon: 'success', 
            title: 'Creado', 
            text: 'Curso creado correctamente', 
            confirmButtonColor: '#28a745', 
            timer: 1500, showConfirmButton: false }); // ← CAMBIADO
          this.resetForm();
          this.cargarCourses();
        },
        error: () => Swal.fire({ 
          icon: 'error', 
          title: 'Error', 
          text: 'No se pudo crear el curso', 
          confirmButtonColor: '#28a745' }) // ← CAMBIADO
      });
    }
  }

  editar(course: Course): void {
    this.modoEdicion = true;
    this.cursoEditandoId = course._id;
    this.form.patchValue({
      title:       course.title,
      description: course.description,
      category:    course.category
    });
  }

  eliminar(id: string): void {
    Swal.fire({                          // ← CAMBIADO
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.eliminarCourse(id).subscribe({
          next: () => {
            Swal.fire({ 
              icon: 'success', 
              title: 'Eliminado', 
              text: 'Curso eliminado correctamente', 
              confirmButtonColor: '#28a745', 
              timer: 1500, showConfirmButton: false });
            this.cargarCourses();
          },
          error: () => Swal.fire({ 
            icon: 'error', 
            title: 'Error', 
            text: 'No se pudo eliminar el curso', 
            confirmButtonColor: '#28a745' })
        });
      }
    });
  }

  resetForm(): void {
    this.form.reset();
    this.imagenSeleccionada = null;
    this.modoEdicion = false;
    this.cursoEditandoId = '';
  }
}