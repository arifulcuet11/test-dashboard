import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserListComponent implements OnInit {  

  constructor(public userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {   
    this.userService.getUserList(); 
  }  

  populateForm(user: User) {    
    this.userService.formData = Object.assign({}, user);
  }

  onDelete(id: string) {   
    if (confirm("Are you sure to delete this user?")) {
      this.userService.deleteUser(id).subscribe(res => {
        this.toastr.warning('User deleted successfully', 'User Registration');        
        this.userService.getUserList();        
      });
    }
  }
}
