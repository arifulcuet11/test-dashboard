import { Injectable } from '@angular/core';

//import { environment } from '../../environments/environment';
import { Dashboard1Data } from '../model/dashboard1data';
import { Dashboard2Data } from '../model/dashboard2data';
import { Dashboard3Data } from '../model/dashboard3data';
import { Dashboard4Data } from '../model/dashboard4data';
import { Dashboard5Data } from '../model/dashboard5data';
import { Dashboard6Data } from '../model/dashboard6data';
import { Dashboard7Data } from '../model/dashboard7data';

import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private router: Router, private toastr: ToastrService, private http: HttpClient) { }

  readonly BaseURI = 'https://stsdash.azurewebsites.net/api';   
   
  get_Dashboard1Data_Bar(): Observable<Dashboard1Data[]> {    
    return this.http.get<Dashboard1Data[]>(this.BaseURI + '/Dashboard/GetDashboard1Data_Bar');
  }

  get_Dashboard1Data_Box(): Observable<Dashboard1Data> {
    return this.http.get<Dashboard1Data>(this.BaseURI + '/Dashboard/GetDashboard1Data_Box');
  }

  get_Dashboard2Data(): Observable<Dashboard2Data[]> {   
    return this.http.get<Dashboard2Data[]>(this.BaseURI + '/Dashboard/GetDashboard2Data');
  }

  get_Dashboard3Data(): Observable<Dashboard3Data> {     
    return this.http.get<Dashboard3Data>(this.BaseURI + '/Dashboard/GetDashboard3Data');
  } 

  get_Dashboard4Data_Bar(): Observable<Dashboard4Data[]> {   
    return this.http.get<Dashboard4Data[]>(this.BaseURI + '/Dashboard/GetDashboard4Data_Bar');
  }  

  get_Dashboard4Data_Box(): Observable<Dashboard4Data> {   
    return this.http.get<Dashboard4Data>(this.BaseURI + '/Dashboard/GetDashboard4Data_Box');
  }  

  get_Dashboard5Data(): Observable<Dashboard5Data[]> {   
    return this.http.get<Dashboard5Data[]>(this.BaseURI + '/Dashboard/GetDashboard5Data');
  }

  get_Dashboard6Data(): Observable<Dashboard6Data[]> {   
    return this.http.get<Dashboard6Data[]>(this.BaseURI + '/Dashboard/GetDashboard6Data');
  }  

  get_Dashboard7Data(): Observable<Dashboard7Data[]> {   
    return this.http.get<Dashboard7Data[]>(this.BaseURI + '/Dashboard/GetDashboard7Data');
  } 
}
