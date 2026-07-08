import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TaskComponent } from './pages/task/task.component';
import { CoursesComponent } from './pages/course/course.component';
import { AdminComponent } from './pages/admin/admin.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
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
        path: "task",
        component: TaskComponent,
        canActivate: [authGuard]
    },
    {
        path: "course",       // ← NUEVO
        component: CoursesComponent,
        canActivate: [authGuard]
    },
    {
        path: "admin",                    // ← NUEVO
        component: AdminComponent,
        canActivate: [authGuard, adminGuard]
    },
];
