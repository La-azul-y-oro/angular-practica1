import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  
  @Output() editUserEmitter = new EventEmitter;
  @Output() cancelEmitter = new EventEmitter;

  constructor(
    private userService: UserService,
    private fb : FormBuilder
  ) {}

  userForm : FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  showMsgError(nameField : string){
    let field = this.userForm.get(nameField); 
    return (field?.dirty || field?.touched) && field?.invalid;
  }

  createUser(){

    let user : any = this.userForm.value;

    this.userService.createUser(user).subscribe(
      {
        next: () => {
          this.editUserEmitter.emit(true);
        },

        error: (error) => {
          console.log(error);
          this.editUserEmitter.emit(false);
        }
      }
    )

  }

  handleCloseModal(){
    this.cancelEmitter.emit();
  }


}
