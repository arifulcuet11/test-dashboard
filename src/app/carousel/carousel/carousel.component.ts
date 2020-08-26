import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IpService } from '../../service/ip.service';

import { Dashboard1Component } from '../../dashboard/dashboard1/dashboard1.component';
import { Dashboard2Component } from '../../dashboard/dashboard2/dashboard2.component';
import { Dashboard3Component } from '../../dashboard/dashboard3/dashboard3.component';
import { Dashboard4Component } from '../../dashboard/dashboard4/dashboard4.component';
import { Dashboard5Component } from '../../dashboard/dashboard5/dashboard5.component';
import { Dashboard6Component } from '../../dashboard/dashboard6/dashboard6.component';

import { UserService } from '../../service/user.service';
import { CarouselService } from '../../service/carousel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  components = [];
  current = 0;
  num: number;
  userName: string;
  time: number;
  timer: any;
  tvIp: string;

  constructor(private activatedRoute: ActivatedRoute, private ipService: IpService, private carouselService: CarouselService, public userService: UserService, private router: Router) {
    this.components.push(Dashboard1Component)
    this.components.push(Dashboard2Component)
    this.components.push(Dashboard3Component)
    this.components.push(Dashboard4Component)
    this.components.push(Dashboard5Component)
    this.components.push(Dashboard6Component)
  }

  ngOnInit() {    
    if (localStorage.getItem('token') == null) {
      this.check("");
    }
    else {
      this.userName = localStorage.getItem('userName');
      this.carouselService.getCarouselDelayTime(this.userName, "TEST")
        .toPromise().then(res => {
          return this.time = res;
        }).then(res => {
          if (res == 0)
            this.time = 5;
          this.time = this.time * 1000;

          if (this.components.length == 6)
            this.num = 4
          else if (this.components.length == 5)
            this.num = 3
          else if (this.components.length == 4)
            this.num = 2
          else if (this.components.length == 3)
            this.num = 1
          else if (this.components.length == 2)
            this.num = 0

          this.timer = setInterval(() => {
            if (this.current++ === this.num) {
              clearInterval(this.timer);
              this.timer = setInterval(() => {
                this.router.navigateByUrl('/planned-large-project');
                localStorage.setItem("fromCarousel", '/carousel');
                if (this.current++ === this.components.length - 1) {
                  this.current = 0;
                }
              }, this.time);
            }
          }, this.time);
        })
        .catch(err => {
          //this.toastr.error('Something went wrong.', 'Data retrieval failed.');
        });
    }
  }

  check(ip: string) {
    if (ip != null) {
      this.ipService.login(ip, this.router.url)
        .toPromise().then((res: any) => {
          localStorage.setItem('tv_token', res.token);
          var payLoad = JSON.parse(window.atob(localStorage.getItem('tv_token').split('.')[1]));
          this.tvIp = payLoad.unique_name;
        })
        .catch(err => {
          this.router.navigateByUrl('/error403');
        })
        .then(res => {
          this.carouselService.getCarouselDelayTime(this.tvIp, "TEST")
            .toPromise().then(res => {
              return this.time = res;
            }).then(res => {
              if (res == 0)
                this.time = 5;
              this.time = this.time * 1000;

              if (this.components.length == 6)
                this.num = 4
              else if (this.components.length == 5)
                this.num = 3
              else if (this.components.length == 4)
                this.num = 2
              else if (this.components.length == 3)
                this.num = 1
              else if (this.components.length == 2)
                this.num = 0

              this.timer = setInterval(() => {
                if (this.current++ === this.num) {
                  clearInterval(this.timer);
                  this.timer = setInterval(() => {
                    this.router.navigateByUrl('/planned-large-project');
                    localStorage.setItem("fromCarousel", '/carousel');
                    if (this.current++ === this.components.length - 1) {
                      this.current = 0;
                    }
                  }, this.time);
                }
              }, this.time);
            })
            .catch(err => {
              //this.toastr.error('Something went wrong.', 'Data retrieval failed.');
              localStorage.removeItem('tv_token');
            });
        })
    }
    else {
      this.router.navigateByUrl('/error403');
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
