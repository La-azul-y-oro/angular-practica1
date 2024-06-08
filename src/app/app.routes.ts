import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { UserComponent } from './components/user/user.component';
import { authGuard, authGuardNotLogin } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: "/inicio" , pathMatch: 'full'},
    { path: 'inicio', component: InicioComponent, canActivate: [authGuardNotLogin] },
    { path: 'login', component: LoginComponent, canActivate: [authGuardNotLogin] },
    { path: 'register', component: RegisterComponent, canActivate: [authGuardNotLogin] },
    { path: 'usuarios', component: UserComponent, canActivate: [authGuard] },
    { path: '**', component: NotFoundComponent }
];
