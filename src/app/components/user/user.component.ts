import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PushComponent } from '../push/push.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PushComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  userList : User [] = [];
  showModal : boolean = false;
  showToast : boolean = false;
  messageToast : string = "";

  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private userService : UserService,
  ){}

  showMsgError(nameField : string){
    let field = this.userForm.get(nameField); 
    return (field?.dirty || field?.touched) && field?.invalid;
  }

  ngOnInit(){
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getAll().subscribe(response => {
      this.userList = response
        .filter(u => u.enabled === true)
        .sort((user1, user2) => (user2.id ?? 0) - (user1.id ?? 0));
    });
  }

  handleModal(value : boolean){
    if(value){
      this.showModal = true;
    }else{
      this.showModal = false;
      this.userForm.reset(); 
    }
  }

  createUser(){
    if(this.userForm.invalid) return;

    let user : User = {
      username: this.userForm.get('username')?.value ?? "",
      email: this.userForm.get('email')?.value ?? "",
      password: this.userForm.get('password')?.value ?? "",
      enabled: true,
    }

    this.userService.createUser(user).subscribe(
      {
        next: () => {
          this.loadUsers();
          this.handleModal(false);
          this.handleToast("El usuario se ha creado correctamente");
        },
        error: (error) => {
          console.error(error);
          this.handleModal(false);
          this.handleToast("Ha ocurrido un error al crear el usuario");
        },
      }
    )
  }

  deleteUser(id : any){
    this.userService.deleteById(id).subscribe(
      {
        next: () => {
          this.showModal = false;
          this.loadUsers();
          this.handleToast("El usuario se ha eliminado correctamente");
        },
        error: (error) => {
          console.error(error);
          this.handleToast("Ha ocurrido un error al eliminar el usuario");
        },
      }
    )
  }

  handleToast(msg : string){
    this.showToast = true;
    this.messageToast = msg;
    setTimeout(() => {
      this.showToast = false;
    }, 3500);
  }
  
}
