import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/environment';
import { RegisterResponse, UserLogin, UserRegister } from '../interfaces';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl+'auth';

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<string> =new BehaviorSubject<string>("");

  constructor(
    private httpClient: HttpClient,
    private router : Router
  ) { 
    this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData=new BehaviorSubject<string>(sessionStorage.getItem("token") || "");
  }

  login(credentials:UserLogin):Observable<any>{
    return this.httpClient.post<any>(this.apiUrl+"/login",credentials).pipe(
      tap( (userData) => {
        sessionStorage.setItem("token", userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map((userData)=> userData.token),
      catchError(this.handleError)
    );
  }

  register(user: UserRegister): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>(this.apiUrl+'/register', user).pipe(
      tap( (userData) => {
        sessionStorage.setItem("token", userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      })
    );
  }

  logout():void{
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
    this.router.navigate(['/inicio']);
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }

  // get userData():Observable<String>{
  //   return this.currentUserData.asObservable();
  // }

  // get userLoginOn(): Observable<boolean>{
  //   return this.currentUserLoginOn.asObservable();
  // }

  get userToken() : string{
    return this.currentUserData.value;
  }

}