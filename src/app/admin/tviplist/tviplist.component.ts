import { Component, OnInit } from '@angular/core';
import { IpService } from '../../service/ip.service';
import { TVIP } from '../../model/tvip';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tviplist',
  templateUrl: './tviplist.component.html',
  styleUrls: ['./tviplist.component.css']
})
export class TVIPListComponent implements OnInit {  

  constructor(public ipService: IpService, private toastr: ToastrService) { }

  ngOnInit() {   
    this.ipService.getIpList(); 
  }  

  populateForm(tvip: TVIP) {    
    this.ipService.formData = Object.assign({}, tvip);
  }

  onDelete(id: number) {   
    if (confirm("Are you sure to delete this TV-IP?")) {
      this.ipService.deleteIp(id).subscribe(res => {
        this.toastr.warning('TV-IP deleted successfully', 'TV-IP Registration');        
        this.ipService.getIpList();        
      });
    }
  }
}