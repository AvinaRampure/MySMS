import { Component, OnInit } from '@angular/core';
import { SMSServiceService } from '../Services/smsservice.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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

  downloadExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.ArrayReport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'report');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, fileName + 'export' + new Date().getTime() + '.xlsx');
  }


}
