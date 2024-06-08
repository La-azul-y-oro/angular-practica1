import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { UserRegister } from '../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  showToast : boolean = false;
  messageToast : string = "";

  constructor (
    private fb : FormBuilder,
    private authService : AuthService,
    private router : Router
  ){}

  userForm : FormGroup = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  register(){
    let user : UserRegister = this.userForm.value;
    this.authService.register(user).subscribe({
      next: (token) => {
        alert("El usuario ha sido creado");
        this.router.navigate(['/usuarios']);
      },
      error: (error) => {
        console.error(error);
        alert("El usuario no ha podido crearse");
      }
    })
    
  }

  showMsgError(nameField : string){
    let field = this.userForm.get(nameField); 
    return (field?.dirty || field?.touched) && field?.invalid;
  }
}
