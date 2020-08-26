import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiService } from '../../service/api.service';
import { IpService } from '../../service/ip.service';
import { ChartService } from '../../service/chart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.css']
})

export class Dashboard1Component implements AfterViewInit {
  public chart: Chart;
  public date: Date;
  public planned: number;
  public inProgress: number;
  public closed: number;  

  constructor(private apiService: ApiService, private ipService: IpService, private router: Router, private toastr: ToastrService) { }

  @ViewChild('graphCanvas', { static: false }) graphCanvas: ElementRef;

  ngAfterViewInit() {    
    if (localStorage.getItem('token') == null) {     
      this.check("");
    }
    else {
      this.apiService.get_Dashboard1Data_Bar()
        .toPromise().then(dashboard1Data => {
          this.date = dashboard1Data[0].date;
          this.chart = ChartService.drawDashboard1Chart(dashboard1Data, this.graphCanvas);
        })
        .catch(err => {
          this.toastr.error('Something went wrong.', 'Data retrieval failed.');
        });

      this.apiService.get_Dashboard1Data_Box()
        .toPromise().then(dashboard1Data => {
          this.planned = dashboard1Data.planned;
          this.inProgress = dashboard1Data.in_Progress;
          this.closed = dashboard1Data.closed;
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
          this.apiService.get_Dashboard1Data_Bar()
            .toPromise().then(dashboard1Data => {
              this.date = dashboard1Data[0].date;
              this.chart = ChartService.drawDashboard1Chart(dashboard1Data, this.graphCanvas);
            })
            .catch(err => {
              if (localStorage.getItem('tv_token') != null)
                this.toastr.error('Something went wrong.', 'Data retrieval failed.');
                localStorage.removeItem('tv_token');
            })
            .then(res => {
              this.apiService.get_Dashboard1Data_Box()
                .toPromise().then(dashboard1Data => {
                  this.planned = dashboard1Data.planned;
                  this.inProgress = dashboard1Data.in_Progress;
                  this.closed = dashboard1Data.closed;
                  localStorage.removeItem('tv_token');
                })
                .catch(err => {
                  if (localStorage.getItem('tv_token') != null)
                    this.toastr.error('Something went wrong.', 'Data retrieval failed.');
                    localStorage.removeItem('tv_token');
                });
            })
        })
    }
    else {
      this.router.navigateByUrl('/error403');
    }
  }
}


