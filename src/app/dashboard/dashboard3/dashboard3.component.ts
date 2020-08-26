import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { IpService } from '../../service/ip.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard3',
  templateUrl: './dashboard3.component.html',
  styleUrls: ['./dashboard3.component.css']
})
export class Dashboard3Component implements OnInit {
  public allProfit: string;
  public plannedProfit: string;
  public evaluatedProfit: string;
  public preparingProfit: string;
  
  constructor(private apiService: ApiService, private ipService: IpService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') == null) {     
      this.check("");
    }
    else {
      this.apiService.get_Dashboard3Data()
        .toPromise().then(dashboard3Data => {
          this.allProfit = dashboard3Data.projects_Value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
          this.plannedProfit = dashboard3Data.planned_projects_value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
          this.evaluatedProfit = dashboard3Data.evaluated_projects_value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
          this.preparingProfit = dashboard3Data.preparing_projects_value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
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
          this.apiService.get_Dashboard3Data()
            .toPromise().then(dashboard3Data => {
              this.allProfit = dashboard3Data.projects_Value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
              this.plannedProfit = dashboard3Data.planned_projects_value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
              this.evaluatedProfit = dashboard3Data.evaluated_projects_value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
              this.preparingProfit = dashboard3Data.preparing_projects_value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
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
