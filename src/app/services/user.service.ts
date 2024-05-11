import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url : string = "http://localhost:8080/api/usuario"

  constructor(private httpClient : HttpClient) { }

  getAll() : Observable<User []>{
    return this.httpClient.get<User []>(this.url);
  }

  createUser(user : User) : Observable<any>{
    return this.httpClient.post<any>(this.url, user);
  }

  deleteById(id : number) : Observable<any>{
    return this.httpClient.delete<any>(`${this.url}/${id}`);
  }
}
