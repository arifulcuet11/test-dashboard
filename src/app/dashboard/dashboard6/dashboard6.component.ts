import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiService } from '../../service/api.service';
import { IpService } from '../../service/ip.service';
import { ChartService } from '../../service/chart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard6',
  templateUrl: './dashboard6.component.html',
  styleUrls: ['./dashboard6.component.css']
})

export class Dashboard6Component implements AfterViewInit {
  public employeeSellsChart: Chart;
  public employeeSells: [];

  constructor(private apiService: ApiService, private ipService: IpService, private router: Router, private toastr: ToastrService) { }

  @ViewChild('employeeSellsCanvas', { static: false }) employeeSellsCanvas: ElementRef;

  ngAfterViewInit() {
    if (localStorage.getItem('token') == null) {     
      this.check("");
    }
    else {
      this.apiService.get_Dashboard6Data()
        .toPromise().then(eipdashboard6Data => {
          this.employeeSells = eipdashboard6Data.map(x=> { 
            return {
              EmployeeName: (function() {                    
                return x.name;                   
              })(), 
              SellAmount: (function(){
                return x.sales_amount;
              })(),
                SellAmount_Table: (function(){
                return x.sales_amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
              })(),
            };
          }) as [];         
          this.employeeSellsChart = ChartService.drawDashboard6Chart(this.employeeSells, this.employeeSellsCanvas);
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
          this.apiService.get_Dashboard6Data()
            .toPromise().then(eipdashboard6Data => { 
              this.employeeSells = eipdashboard6Data.map(x=> { 
                return {
                  EmployeeName: (function() {                    
                    return x.name;                   
                  })(), 
                  SellAmount: (function(){
                    return x.sales_amount;
                  })(),
                    SellAmount_Table: (function(){
                    return x.sales_amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                  })(),
                };
              }) as [];              
              this.employeeSellsChart = ChartService.drawDashboard6Chart(this.employeeSells, this.employeeSellsCanvas);
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