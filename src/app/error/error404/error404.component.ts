import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.userService.logout();
  }
}
