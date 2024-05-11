import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-push',
  standalone: true,
  imports: [],
  templateUrl: './push.component.html',
  styleUrl: './push.component.css'
})
export class PushComponent {
  @Input() message : string = "";
  @Output() close : EventEmitter<any> = new EventEmitter();

  closeEvent(){
    this.close.emit();
  }
}
