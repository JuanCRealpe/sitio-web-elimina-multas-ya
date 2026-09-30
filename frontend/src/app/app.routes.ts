import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'; // ← NUEVO
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CoursesComponent } from './pages/course/course.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { PaymentComponent } from './pages/payment/payment.component'; // ← NUEVO wompi
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { subscriptionGuard } from './guards/subscription.guard'; // ← NUEVO wompi

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent   // ← CAMBIADO (antes redirigía a login)
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "course",       // ← NUEVO
        component: CoursesComponent,
        canActivate: [authGuard, subscriptionGuard]
    },
    {
        path: "admin",                    // ← NUEVO
        component: AdminComponent,
        canActivate: [authGuard, adminGuard]
    },
    {
        path: "course/:id",
        component: CourseDetailComponent,
        canActivate: [authGuard, subscriptionGuard] // ← CAMBIADO
    },
    {
        path: "payment",                // ← NUEVO
        component: PaymentComponent,
        canActivate: [authGuard]
    },
];