import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  route: string;

  constructor(private location: Location, private router: Router) {
    router.events.subscribe(val => {      
      var urlVal = val as NavigationStart;  
       if(urlVal.url == "/home")
         window.location.reload();     
    });
   }     

  ngOnInit(): void {   
  }
}
