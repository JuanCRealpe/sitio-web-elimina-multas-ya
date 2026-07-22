import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { DatosPago } from '../../interfaces/payment';
import Swal from 'sweetalert2';

declare var WidgetCheckout: any;

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  private paymentService = inject(PaymentService);
  private authService    = inject(AuthService);
  private router         = inject(Router);

  datosPago: DatosPago | null = null;
  cargando: boolean = false;

  ngOnInit(): void {
    this.cargarDatosPago();
  }

  cargarDatosPago(): void {
    this.cargando = true;
    this.paymentService.crearPago().subscribe({
      next: (res) => {
        this.datosPago = res;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo cargar el pago', confirmButtonColor: '#28a745' });
      }
    });
  }

  pagar(): void {
    if (!this.datosPago) return;

    const checkout = new WidgetCheckout({
      currency:    this.datosPago.moneda,
      amountInCents: this.datosPago.monto,
      reference:   this.datosPago.referencia,
      publicKey:   this.datosPago.publicKey,
      signature:   { integrity: this.datosPago.firma },
      customerData: {
        email:     this.datosPago.email,
        fullName:  this.datosPago.nombre
      }
    });

    checkout.open((result: any) => {
      const transaccion = result.transaction;

      if (transaccion.status === 'APPROVED') {
        this.authService.guardarSuscripcion(true);
        Swal.fire({
          icon: 'success',
          title: '¡Pago exitoso!',
          text: 'Tu suscripción está activa por 3 meses',
          confirmButtonColor: '#28a745'
        }).then(() => {
          this.router.navigate(['/course']);
        });
      } else {
        Swal.fire({ icon: 'error', title: 'Pago fallido', text: 'Intenta de nuevo', confirmButtonColor: '#28a745' });
      }
    });
  }
}