import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiService } from '../../service/api.service';
import { IpService } from '../../service/ip.service';
import { ChartService } from '../../service/chart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.css']
})

export class Dashboard2Component implements AfterViewInit {
  public chart: Chart;
  public date: Date;  

  constructor(private apiService: ApiService, private ipService: IpService, private router: Router, private toastr: ToastrService) { }

  @ViewChild('graphCanvas', { static: false }) graphCanvas: ElementRef;

  ngAfterViewInit() {
    if (localStorage.getItem('token') == null) {    
      this.check("");
    }
    else {
      this.apiService.get_Dashboard2Data()
        .toPromise().then(dashboard2Data => {
          this.date = dashboard2Data[0].date;
          this.chart = ChartService.drawDashboard2Chart(dashboard2Data, this.graphCanvas);
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
          this.apiService.get_Dashboard2Data()
            .toPromise().then(dashboard2Data => {
              this.date = dashboard2Data[0].date;
              this.chart = ChartService.drawDashboard2Chart(dashboard2Data, this.graphCanvas);
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



