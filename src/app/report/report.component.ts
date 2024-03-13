import { Component, OnInit } from '@angular/core';
import { SMSServiceService } from '../Services/smsservice.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  ArrayReport: any=[];

  constructor(private service: SMSServiceService){}

  ngOnInit(){
    this.getReportData();
  }

  getReportData(){
    this.service.getReportAPI().subscribe({
      next:(res:any)=>{
        
        console.log('resresres',res)
        this.ArrayReport=res
      }
    })
  }


}
