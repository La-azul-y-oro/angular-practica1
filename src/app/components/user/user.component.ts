import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PushComponent } from '../push/push.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PushComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(
    private userService : UserService,
    private fb : FormBuilder
  ){}

  userList : User [] = [];
  showModal : boolean = false;
  showToast : boolean = false;
  messageToast : string = "";

  // ejemplo "clasico"
  // userForm = new FormGroup({
  //   username: new FormControl('', Validators.required),
  //   email: new FormControl('', Validators.required),
  //   password: new FormControl('', Validators.required)
  // });
  
  // utilizando FormBuilder
  userForm : FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

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
        .sort((user1, user2) => user2.id - user1.id);
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

    let user : any = this.userForm.value;

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
