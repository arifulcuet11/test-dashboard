import { Component, ViewChild, AfterViewInit, ElementRef} from '@angular/core';
import { Chart } from 'chart.js';
import { ApiService } from '../../service/api.service';
import { IpService } from '../../service/ip.service';
import { ChartService } from '../../service/chart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard4',
  templateUrl: './dashboard4.component.html',
  styleUrls: ['./dashboard4.component.css']
})

   export class Dashboard4Component implements AfterViewInit {  
    public chart: Chart;
    public date: Date;   
    public remainingValue: string;
    public projectsInProgress: number;
    public lastMonthSell: string; 

    constructor(private apiService: ApiService, private ipService: IpService, private router: Router, private toastr: ToastrService) { }
  
    @ViewChild('graphCanvas', {static: false}) graphCanvas: ElementRef;
  
      ngAfterViewInit() {
        if (localStorage.getItem('token') == null)
        {        
          this.check("");
        }
      else{
         this.apiService.get_Dashboard4Data_Bar()
        .toPromise().then(dashboard4Data => {              
          this.date = dashboard4Data[0].date;
          this.chart = ChartService.drawDashboard4Chart(dashboard4Data, this.graphCanvas);
        })
        .catch(err => {         
          this.toastr.error('Something went wrong.', 'Data retrieval failed.');
        });

        this.apiService.get_Dashboard4Data_Box()
          .toPromise().then(dashboard4Data => {              
            this.remainingValue = dashboard4Data.remaining_value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
            this.projectsInProgress = dashboard4Data.projects_in_progress;
            this.lastMonthSell = dashboard4Data.last_month_sell.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');        
          })
          .catch(err => {            
            this.toastr.error('Something went wrong.', 'Data retrieval failed.');
          }); 
      }   
    } 

  check(ip:string)
  {      
    if(ip != null)
    {  
      this.ipService.login(ip, this.router.url)
        .toPromise().then((res: any) => {
          localStorage.setItem('tv_token', res.token);
        })
        .catch(err => {
          this.router.navigateByUrl('/error403');
        })
        .then(res => {
      this.apiService.get_Dashboard4Data_Bar()
        .toPromise().then(dashboard41Data => {              
          this.date = dashboard41Data[0].date;
          this.chart = ChartService.drawDashboard4Chart(dashboard41Data, this.graphCanvas);
        })
        .catch(err => {   
          if (localStorage.getItem('tv_token') != null)      
          this.toastr.error('Something went wrong.', 'Data retrieval failed.');
          localStorage.removeItem('tv_token');
        })
        .then(res => {
        this.apiService.get_Dashboard4Data_Box()
          .toPromise().then(dashboard4Data => {               
            this.remainingValue = dashboard4Data.remaining_value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
            this.projectsInProgress = dashboard4Data.projects_in_progress;
            this.lastMonthSell = dashboard4Data.last_month_sell.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');  
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
    else{
      this.router.navigateByUrl('/error403');     
    }
  } 
  }
  


