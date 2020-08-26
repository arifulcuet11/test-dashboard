import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-error500',
  templateUrl: './error500.component.html',
  styleUrls: ['./error500.component.css']
})
export class Error500Component implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.userService.logout();
  }
}
