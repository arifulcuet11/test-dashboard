import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {  

  constructor(public userService: UserService, private toastr: ToastrService) {

  }

  ngOnInit() {    
    this.resetForm();    
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.userService.formData = {     
      id: '',
      userName: '' ,
      email: '',
      passwordHash: ''
    }
  }

  onSubmit(form: NgForm) {   
    if (form.value.id == '' || form.value.id == null) {
      form.value.id = '';
      this.insert(form);
    }
    else {
      this.update(form);
    }
  }

  insert(form: NgForm) {
    this.userService.postUser(form.value).subscribe(res => {
      this.toastr.success('User added successfully', 'User Registration');      
      form.controls['id'].reset();
      form.controls['username'].reset();
      form.controls['email'].reset();
      form.controls['passwordhash'].reset();
      this.userService.getUserList();
    })
  }

  update(form: NgForm) {
    this.userService.putUser(form.value).subscribe(res => {
      this.toastr.info('User updated successfully', 'User Registration');     
      form.controls['id'].reset();
      form.controls['username'].reset();
      form.controls['email'].reset();
      form.controls['passwordhash'].reset();
      this.userService.getUserList();     
    })
  }
}

