import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UnoComponent } from './components/uno/uno.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UnoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-practica1';

  estoEsUnaVariable : String = "esto es una variable";
}
