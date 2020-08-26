import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { TVIP } from '../model/tvip';

@Injectable({
  providedIn: 'root'
})
export class IpService {
  formData: TVIP;  
  ipList: TVIP[];

  readonly BaseURI = 'https://stsdash.azurewebsites.net/api';

  constructor(private toastr: ToastrService, private http: HttpClient) { } 

  login(ip: string, url: string) {
    let setIPAddress = {
      ipAddress: ip,
      url: url
    };
    return this.http.post(this.BaseURI + '/IPAddress/Login', setIPAddress);
  }

  // carousel_login(ip: string, url: string) {
  //   let setIPAddress = {
  //     ipAddress: ip,
  //     url: url
  //   };
  //   return this.http.post(this.BaseURI + '/IPAddress/Carousel_Login', setIPAddress)      
  // }

  postTVIP(formData: TVIP) {
    return this.http.post(this.BaseURI + '/IP/PostIP/', formData);
  }

  putTVIP(formData: TVIP) {
    return this.http.put(this.BaseURI + '/IP/PutIP/', formData);
  }

  getIpList() {    
    this.http.get(this.BaseURI + '/IP/GetIPList/')
      .toPromise().then(res => 
        {          
          this.ipList = res as TVIP[]
        });      
  }

  deleteIp(id: number) {   
    return this.http.delete(this.BaseURI + '/IP/DeleteIP?id=' + id);
  }
}