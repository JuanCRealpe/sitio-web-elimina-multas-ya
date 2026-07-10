import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { StepService } from '../../services/step.service';
import { AuthService } from '../../services/auth.service';
import { Step, Bloque } from '../../interfaces/step';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit {
  private route       = inject(ActivatedRoute);
  private stepService = inject(StepService);
  private authService = inject(AuthService);
  private fb          = inject(FormBuilder);

  courseId: string = '';
  steps: Step[] = [];
  cargando: boolean = false;
  esAdmin: boolean = false;
  archivoSeleccionado: File | null = null;

  stepSeleccionadoId: string = '';
  stepEditandoId: string = '';
  bloqueEditandoId: string = '';
  bloqueEditandoStepId: string = '';

  // formulario crear paso
  stepForm = this.fb.group({
    titulo: ['', Validators.required],
    orden:  ['', Validators.required]
  });

  // formulario editar paso
  stepEditForm = this.fb.group({
    titulo: ['', Validators.required],
    orden:  ['', Validators.required]
  });

  // formulario agregar bloque
  bloqueForm = this.fb.group({
    tipo:      ['', Validators.required],
    contenido: [''],
    nombre:    [''],
    url:       [''],
    redirige:  ['']
  });

  // formulario editar bloque
  bloqueEditForm = this.fb.group({
    tipo:      [''],
    contenido: [''],
    nombre:    [''],
    url:       [''],
    redirige:  ['']
  });

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.esAdmin  = this.authService.esAdmin();
    this.cargarSteps();
  }

  cargarSteps(): void {
    this.cargando = true;
    this.stepService.obtenerStepsPorCurso(this.courseId).subscribe({
      next: (res) => {
        this.steps = res.steps;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudieron cargar los pasos', confirmButtonColor: '#28a745' });
      }
    });
  }

  onArchivoSeleccionado(event: any): void {
    this.archivoSeleccionado = event.target.files[0];
  }

  // ── CREAR PASO ──
  crearStep(): void {
    if (this.stepForm.invalid) {
      this.stepForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('courseId', this.courseId);
    formData.append('titulo',   this.stepForm.value.titulo!);
    formData.append('orden',    this.stepForm.value.orden!);

    this.stepService.crearStep(formData).subscribe({
      next: () => {
        Swal.fire({ icon: 'success', title: 'Paso creado', confirmButtonColor: '#28a745', timer: 1500, showConfirmButton: false });
        this.stepForm.reset();
        this.cargarSteps();
      },
      error: () => Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo crear el paso', confirmButtonColor: '#28a745' })
    });
  }

  // ── EDITAR PASO ──
  editarStep(step: Step): void {
    this.stepEditandoId = step._id;
    this.stepEditForm.patchValue({
      titulo: step.titulo,
      orden:  String(step.orden)
    });
  }

  guardarEditarStep(stepId: string): void {
    if (this.stepEditForm.invalid) {
      this.stepEditForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('titulo', this.stepEditForm.value.titulo!);
    formData.append('orden',  this.stepEditForm.value.orden!);

    this.stepService.actualizarStep(stepId, formData).subscribe({
      next: () => {
        Swal.fire({ icon: 'success', title: 'Paso actualizado', confirmButtonColor: '#28a745', timer: 1500, showConfirmButton: false });
        this.stepEditandoId = '';
        this.cargarSteps();
      },
      error: () => Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo actualizar el paso', confirmButtonColor: '#28a745' })
    });
  }

  // ── ELIMINAR PASO ──
  eliminarStep(stepId: string): void {
    Swal.fire({
      title: '¿Eliminar paso?',
      text: 'Se eliminará el paso y todos sus bloques',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.stepService.eliminarStep(stepId).subscribe({
          next: () => {
            Swal.fire({ icon: 'success', title: 'Paso eliminado', confirmButtonColor: '#28a745', timer: 1500, showConfirmButton: false });
            this.cargarSteps();
          },
          error: () => Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo eliminar el paso', confirmButtonColor: '#28a745' })
        });
      }
    });
  }

  // ── AGREGAR BLOQUE ──
  agregarBloque(stepId: string): void {
    if (this.bloqueForm.invalid) {
      this.bloqueForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('tipo',      this.bloqueForm.value.tipo!);
    formData.append('contenido', this.bloqueForm.value.contenido || '');
    formData.append('nombre',    this.bloqueForm.value.nombre || '');
    formData.append('url',       this.bloqueForm.value.url || '');
    formData.append('redirige',  this.bloqueForm.value.redirige || '');

    if (this.archivoSeleccionado) {
      formData.append('contenido', this.archivoSeleccionado);
    }

    this.stepService.agregarBloque(stepId, formData).subscribe({
      next: () => {
        Swal.fire({ icon: 'success', title: 'Bloque agregado', confirmButtonColor: '#28a745', timer: 1500, showConfirmButton: false });
        this.bloqueForm.reset();
        this.archivoSeleccionado = null;
        this.stepSeleccionadoId = '';
        this.cargarSteps();
      },
      error: () => Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo agregar el bloque', confirmButtonColor: '#28a745' })
    });
  }

  // ── EDITAR BLOQUE ──
  editarBloque(stepId: string, bloque: Bloque): void {
    this.bloqueEditandoId     = bloque._id;
    this.bloqueEditandoStepId = stepId;
    this.bloqueEditForm.patchValue({
      tipo:      bloque.tipo,
      contenido: bloque.contenido || '',
      nombre:    bloque.nombre    || '',
      url:       bloque.url       || '',
      redirige:  bloque.redirige  || ''
    });
  }

  guardarEditarBloque(stepId: string, bloqueId: string): void {
    const formData = new FormData();
    formData.append('tipo',      this.bloqueEditForm.value.tipo      || '');
    formData.append('contenido', this.bloqueEditForm.value.contenido || '');
    formData.append('nombre',    this.bloqueEditForm.value.nombre    || '');
    formData.append('url',       this.bloqueEditForm.value.url       || '');
    formData.append('redirige',  this.bloqueEditForm.value.redirige  || '');

    if (this.archivoSeleccionado) {
      formData.append('contenido', this.archivoSeleccionado);
    }

    this.stepService.actualizarBloque(stepId, bloqueId, formData).subscribe({
      next: () => {
        Swal.fire({ icon: 'success', title: 'Bloque actualizado', confirmButtonColor: '#28a745', timer: 1500, showConfirmButton: false });
        this.bloqueEditandoId = '';
        this.archivoSeleccionado = null;
        this.cargarSteps();
      },
      error: () => Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo actualizar el bloque', confirmButtonColor: '#28a745' })
    });
  }

  // ── ELIMINAR BLOQUE ──
  eliminarBloque(stepId: string, bloqueId: string): void {
    Swal.fire({
      title: '¿Eliminar bloque?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.stepService.eliminarBloque(stepId, bloqueId).subscribe({
          next: () => {
            Swal.fire({ icon: 'success', title: 'Bloque eliminado', confirmButtonColor: '#28a745', timer: 1500, showConfirmButton: false });
            this.cargarSteps();
          },
          error: () => Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo eliminar el bloque', confirmButtonColor: '#28a745' })
        });
      }
    });
  }
}