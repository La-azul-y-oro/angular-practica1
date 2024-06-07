import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
    { path: '', redirectTo: "/inicio" , pathMatch: 'full'},
    { path: 'inicio', component: InicioComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'usuarios', component: UserComponent },
    { path: '**', component: NotFoundComponent }
];
