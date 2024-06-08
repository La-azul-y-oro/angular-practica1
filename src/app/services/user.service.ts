import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl+'usuario';

  constructor(private httpClient : HttpClient) { }

  getAll() : Observable<User []>{
    return this.httpClient.get<User []>(this.apiUrl);
  }

  createUser(user : User) : Observable<any>{
    return this.httpClient.post<any>(this.apiUrl, user);
  }

  deleteById(id : number) : Observable<any>{
    return this.httpClient.delete<any>(`${this.apiUrl}/${id}`);
  }
}
