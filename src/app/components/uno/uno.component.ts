import { Component } from '@angular/core';
import { MiServicioService } from '../../mi-servicio.service';

@Component({
  selector: 'app-uno',
  standalone: true,
  imports: [],
  templateUrl: './uno.component.html',
  styleUrl: './uno.component.css'
})
export class UnoComponent {
  title : string = "Mi componente";

  getTitle(){
    return this.title;
  }

  click(){
    this.title = "Bocaaaaaa";
  }

  constructor(private service:MiServicioService) {

  }

  getEmpleado() {
    return this.service.getEmpleador();
  }
}
