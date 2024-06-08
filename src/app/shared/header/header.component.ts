import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLogged : boolean = false;
  username: any;

  constructor(private authService : AuthService) { }

  decodeJWT(): void {
    let token : string = sessionStorage.getItem("token") || '';
    if(token){
      try {
        this.username = jwtDecode(token).sub;
        console.log(this.username);
      } catch (error) {
        this.username = null;
        console.error('Error decoding JWT:', error);
      }
    } else{
      this.username = null;
    }
  }


  ngOnInit(): void {
    this.authService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.isLogged=userLoginOn;
        this.decodeJWT();
      }
    });
  }

  logout(){
    this.authService.logout();
  }

}
