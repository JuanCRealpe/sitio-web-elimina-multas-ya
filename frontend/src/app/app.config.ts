// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { importProvidersFrom } from '@angular/core'; 
// import { ReactiveFormsModule } from '@angular/forms'; 

// import { routes } from './app.routes';
// import { provideHttpClient } from '@angular/common/http';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }), 
//     provideRouter(routes),
//     provideHttpClient(),
//     importProvidersFrom(ReactiveFormsModule)

//   ]
// };
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core'; 
import { ReactiveFormsModule } from '@angular/forms'; 

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // ← CAMBIADO
import { authInterceptor } from './interceptors/auth.interceptor'; // ← NUEVO

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])), // ← CAMBIADO
    importProvidersFrom(ReactiveFormsModule)
  ]
};