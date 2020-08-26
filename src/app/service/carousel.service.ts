import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  selectedTime: number;

  readonly rootURL = "https://stsdash.azurewebsites.net/api";

  constructor(private http: HttpClient) { }

  setCarouselDelayTime(userName:string, companyName:string, selectedTime:number)  
  {      
    //const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) }; 
    let setTime = {  
      username: userName,  
      companyname: companyName,
      delaytime: selectedTime  
    };    
    return this.http.post(this.rootURL + '/Carousel/PostCarouselDelayTime/',  setTime);    
  } 
  
   getCarouselDelayTime(userName:string, companyName:string): Observable<number> {     
    return this.http.get<number>(this.rootURL + '/Carousel/GetCarouselDelayTime?username=' + userName + '&companyname=' + companyName);
  }
}
