import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { InicioComponent } from './pages/inicio/inicio.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink,
    RouterLinkActive,
    UserComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-practica1';

  estoEsUnaVariable: String = "esto es una variable";
}
