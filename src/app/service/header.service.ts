import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HeaderService {
  
  readonly rootURL = "https://stsdash.azurewebsites.net/api";

  constructor(private http: HttpClient) { }
  
  getLogoUrl(): Observable<string> {    
    return this.http.get<string>(this.rootURL + '/Image/GetCustomerLogoUrl');    
  }
}
