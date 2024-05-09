import { Component } from '@angular/core';
import { MiServicioService } from '../../services/mi-servicio.service';
import { DosComponent } from '../dos/dos.component';

@Component({
  selector: 'app-uno',
  standalone: true,
  imports: [DosComponent],
  templateUrl: './uno.component.html',
  styleUrl: './uno.component.css'
})
export class UnoComponent {
  title : string = "Mi componente";
  fontSizePx = 16;

  getTitle(){
    return this.title;
  }

  click(){
    this.title = "Bocaaaaaa";
  }

  constructor(private service: MiServicioService) {

  }

  getEmpleado() {
    return this.service.getEmpleador();
  }
}
