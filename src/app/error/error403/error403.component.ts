import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-error403',
  templateUrl: './error403.component.html',
  styleUrls: ['./error403.component.css']
})
export class Error403Component implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.userService.logout();
  }
}