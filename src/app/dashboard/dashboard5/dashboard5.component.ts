import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiService } from '../../service/api.service';
import { IpService } from '../../service/ip.service';
import { ChartService } from '../../service/chart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard5',
  templateUrl: './dashboard5.component.html',
  styleUrls: ['./dashboard5.component.css']
})

export class Dashboard5Component implements AfterViewInit {
  public monthsSalesChart: Chart;
  public date: Date;

  constructor(private apiService: ApiService, private ipService: IpService, private router: Router, private toastr: ToastrService) { }

  @ViewChild('monthsSalesCanvas', { static: false }) monthsSalesCanvas: ElementRef;

  ngAfterViewInit() {
    if (localStorage.getItem('token') == null) {     
      this.check("");
    }
    else {     
      this.apiService.get_Dashboard5Data()
        .toPromise().then(dashboard5Data => {
          this.date = dashboard5Data[0].date;
          this.monthsSalesChart = ChartService.drawDashboard5Chart(dashboard5Data, this.monthsSalesCanvas);
        })
        .catch(err => {
          this.toastr.error('Something went wrong.', 'Data retrieval failed.');
        });
    }
  }
  
  check(ip: string) {   
    if (ip != null) {
      this.ipService.login(ip, this.router.url)
        .toPromise().then((res: any) => {
          localStorage.setItem('tv_token', res.token);
        })
        .catch(err => {
          this.router.navigateByUrl('/error403');
        })
        .then(res => {
          this.apiService.get_Dashboard5Data()
            .toPromise().then(dashboard5Data => {
              this.date = dashboard5Data[0].date;
              this.monthsSalesChart = ChartService.drawDashboard5Chart(dashboard5Data, this.monthsSalesCanvas);
              localStorage.removeItem('tv_token');
            })
            .catch(err => {
              if (localStorage.getItem('tv_token') != null)
                this.toastr.error('Something went wrong.', 'Data retrieval failed.');
                localStorage.removeItem('tv_token');
            });
        })
    }
    else {
      this.router.navigateByUrl('/error403');
    }
  }
}