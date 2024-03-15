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

  columns: string[]=[];
  response:boolean=false;
  isContainer2Visible:boolean=false;
  selectedItemIndex: number | null = null; // declare the property

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

  toggleVisibility(index: number | null){
    // this.response=!this.response;
    this.selectedItemIndex = index;
    this.isContainer2Visible = !this.isContainer2Visible; // update the method to accept and use the index
  }

// toggleVisibility(index: number | null) {
// }

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
