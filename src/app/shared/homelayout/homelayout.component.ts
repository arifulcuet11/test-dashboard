import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-homelayout',
  templateUrl: './homelayout.component.html',
  styleUrls: ['./homelayout.component.css']
})
export class HomelayoutComponent implements OnInit {
  isLoggedIn: Observable<boolean>;
  isAdmin: boolean;

  constructor(public userService: UserService) {
    this.isLoggedIn = userService.isLoggedIn();
    this.isAdmin = userService.isAdmin();
   }

  ngOnInit(): void {    
    if (localStorage.getItem('tv_token') != null)
    localStorage.removeItem('tv_token');
  }
}
