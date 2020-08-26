import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarouselService } from '../../service/carousel.service';

@Component({
  selector: 'app-setdelaytime',
  templateUrl: './setdelaytime.component.html',
  styleUrls: ['./setdelaytime.component.css']
})
export class SetDelayTimeComponent implements OnInit {
  delayTimes: any;
  userName: string;
  selectedTime = 0;
  
  constructor(private carouselService: CarouselService, private toastr: ToastrService) { }

  ngOnInit() {
    this.delayTimes = [
      5,
      10,
      15,
      20,
      25,
      30,
      35,
      40,
      45,
      50,
      55,
      60
    ];
    this.userName = localStorage.getItem('userName');
    this.carouselService.getCarouselDelayTime(this.userName, "TEST")
      .toPromise().then(res => {
        this.selectedTime = res;
      })
      .catch(err => {
        //this.toastr.error('Something went wrong.', 'Data retrieval failed.');
      });
  }

  Save() {
    if (this.selectedTime == 0) {
      this.toastr.warning('Select delay time', 'Delay Time Setting');
      return;
    }
    this.selectedTime = Number(this.selectedTime);
    this.userName = localStorage.getItem('userName');
    this.carouselService.setCarouselDelayTime(this.userName, "TEST", this.selectedTime).subscribe(res => {
      this.toastr.success('Delay time set up successfully', 'Delay Time Setting');
    });
  }
}
