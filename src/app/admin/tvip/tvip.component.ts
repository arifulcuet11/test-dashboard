import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IpService } from '../../service/ip.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tvip',
  templateUrl: './tvip.component.html',
  styleUrls: ['./tvip.component.css']
})
export class TVIPComponent implements OnInit {

  constructor(public ipService: IpService, private toastr: ToastrService) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.ipService.formData = {
      id: 0,
      ipAddress: ''
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.id == 0 || form.value.id == null) {
      form.value.id = 0;
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.ipService.postTVIP(form.value).subscribe(res => {
      this.toastr.success('TV-IP added successfully', 'TV-IP Register');
      form.controls['id'].reset();
      form.controls['ipaddress'].reset();
      this.ipService.getIpList();     
    })
  }

  updateRecord(form: NgForm) {
    this.ipService.putTVIP(form.value).subscribe(res => {
      this.toastr.info('TV-IP updated successfully', 'TV-IP Register')
      form.controls['id'].reset();
      form.controls['ipaddress'].reset();
      this.ipService.getIpList();      
    })
  }
}
