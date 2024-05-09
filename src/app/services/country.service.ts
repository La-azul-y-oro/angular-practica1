import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private httpClient : HttpClient) { }

  getCountries(): Observable<Country[]>{
    return this.httpClient.get<Country[]>('https://restcountries.com/v3.1/all?fields=name,capital');
  }

}