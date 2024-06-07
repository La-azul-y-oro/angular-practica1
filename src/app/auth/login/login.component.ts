import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(
   // todo crear y agregar login service
    private fb : FormBuilder
  ) {}

  userForm : FormGroup = this.fb.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required, Validators.minLength(8)]
  })

  login(){
    //implementar metodo login
  }

  showMsgError(nameField : string){
    let field = this.userForm.get(nameField); 
    return (field?.dirty || field?.touched) && field?.invalid;
  }

}