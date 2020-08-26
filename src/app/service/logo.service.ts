import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoService {

  readonly rootURL = "https://stsdash.azurewebsites.net/api";

  constructor(private http: HttpClient) { }
  
  postCustomerLogo(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.rootURL + '/Image/PostCustomerLogo', formData);
  }
}
