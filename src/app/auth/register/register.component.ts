import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor (private fb : FormBuilder){}

  userForm : FormGroup = this.fb.group({
    username: ['', Validators.required, Validators.email],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    password: ['', Validators.required, Validators.minLength(8)]
  })

  register(){
    //implementar metodo login
  }

  showMsgError(nameField : string){
    let field = this.userForm.get(nameField); 
    return (field?.dirty || field?.touched) && field?.invalid;
  }
}
