import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PushComponent } from '../push/push.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PushComponent, EditUserComponent],
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
    this.showModal = value;
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

  handleEditEvent(value : boolean) {

    this.showModal = false;

    if(value){
      this.handleToast("El usuario se ha creado correctamente");
    } else{
      this.handleToast("Ha ocurrido un error al crear el usuario");
    }
  }
}
