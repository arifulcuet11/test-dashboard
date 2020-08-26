import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { IpService } from '../../service/ip.service';
import { Dashboard7Data } from '../../model/dashboard7data';
import { MAX_PROJECT_TITLE } from '../../other/constant';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard7',
  templateUrl: './dashboard7.component.html',
  styleUrls: ['./dashboard7.component.css']
})

export class Dashboard7Component implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  public projects: Dashboard7Data[] = [];
  public MAX_PROJECT_TITLE = MAX_PROJECT_TITLE;
  public intervalId: any;

  constructor(private apiService: ApiService, private ipService: IpService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') == null) {     
      this.check("");
    }
    else {
      this.dtOptions = {
        pagingType: 'full_numbers',
        //pageLength: 5,
        processing: true
      };
      this.apiService.get_Dashboard7Data()
        .toPromise().then(Dashboard7Data => {          
          this.projects = Dashboard7Data.map(x=> { 
            return {
              project_code: (function() {                    
                return x.project_code;                   
              })(), 
              project_title: (function() {                    
                return x.project_title;                   
              })(), 
              p_acceptances: (function() {                    
                return x.p_acceptances.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');                   
              })(), 
              p_expenses: (function(){
                return x.p_expenses.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
              })(),
              tS_DU: (function(){
                return x.tS_DU.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
              })(),
              pelningumas: (function(){
                return x.pelningumas.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
              })(),
              p_pelnas: (function(){
                return x.p_pelnas.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
              })(),
              client_name: (function() {                    
                return x.client_name;                   
              })(), 
              department: (function() {                    
                return x.department;                   
              })(), 
              owner_name: (function() {                    
                return x.owner_name;                   
              })(), 
            };
          }) as [];         
          this.dtTrigger.next();
          if(localStorage.getItem("fromCarousel") == '/carousel')
          this.rerender();  
        })
        .catch(err => {
          this.toastr.error('Something went wrong.', 'Data retrieval failed.');
        });
    }
  }

  ngOnDestroy(): void {    
    this.dtTrigger.unsubscribe();  
    clearInterval(this.intervalId);   
  }

  rerender(): void {    
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {      
      dtInstance.destroy();      
      let table = $('#datatable').DataTable({
        //pageLength: 5
      }); 
    
      var currentInt = 0;  
      var pageInfo = table.page.info(); 
      var pageCount = pageInfo.pages;     
   
      this.intervalId = setInterval(() => {    
          table.page('next').draw( 'page' );         
          if (currentInt++ === pageCount) {           
            currentInt = 0;  
            this.router.navigateByUrl('/carousel');  
          }                                     
        }, 10000);   
    });

    localStorage.removeItem("fromCarousel")
  } 

  check(ip: string) {
    if (ip != null) {      
      this.dtOptions = {
        pagingType: 'full_numbers',
        //pageLength: 5,
        processing: true
      };
      this.ipService.login(ip, this.router.url)
        .toPromise().then((res: any) => {
          localStorage.setItem('tv_token', res.token);
        })
        .catch(err => {
          this.router.navigateByUrl('/error403');
        })
        .then(res => {
          this.apiService.get_Dashboard7Data()
            .toPromise().then(Dashboard7Data => { 
              this.projects = Dashboard7Data.map(x=> { 
                return {
                  project_code: (function() {                    
                    return x.project_code;                   
                  })(), 
                  project_title: (function() {                    
                    return x.project_title;                   
                  })(), 
                  p_acceptances: (function() {                    
                    return x.p_acceptances.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');                   
                  })(), 
                  p_expenses: (function(){
                    return x.p_expenses.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                  })(),
                  tS_DU: (function(){
                    return x.tS_DU.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                  })(),
                  pelningumas: (function(){
                    return x.pelningumas.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                  })(),
                  p_pelnas: (function(){
                    return x.p_pelnas.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                  })(),
                  client_name: (function() {                    
                    return x.client_name;                   
                  })(), 
                  department: (function() {                    
                    return x.department;                   
                  })(), 
                  owner_name: (function() {                    
                    return x.owner_name;                   
                  })(), 
                };
              }) as [];         
              this.dtTrigger.next();
              if(localStorage.getItem("fromCarousel") == '/carousel')
              this.rerender();  
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
