import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { UserLogin } from '../interfaces';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(
    private authService : AuthService,
    private fb : FormBuilder,
    private router : Router
  ) {}

  userForm : FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  login(){
    let user : UserLogin = this.userForm.value;
    this.authService.login(user).subscribe({
      next: (token) => {
        this.router.navigate(['/usuarios']);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  showMsgError(nameField : string){
    let field = this.userForm.get(nameField); 
    return (field?.dirty || field?.touched) && field?.invalid;
  }

}