import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SMSServiceService {

  constructor(private http:HttpClient) { }
  userName: any;
  localdata(){
    this.userName=(localStorage.getItem('count'));
    return
  }

  getBalance(username:any){
    return this.http.get('http://api.sms123.in/api/Credit/Credit?username='+username)
  }

  getsms(data:any){
    return this.http.get('http://api.sms123.in/api/QuickSend/QuickSend?username='+data.username+'&password='+data.password+
    '&mob='+data.mob+'&msg='+data.msg+'&sender='+data.sender+'&templateid='+data.templateid+'&coding='+data.coding,data)
  }

  ResArray: any=[]=[];

  ngOnInit(){
    console.log(this.ResArray);
  }

  postArrayAPI(data:any){
    return this.http.post('http://localhost:3000/report',data)
  }

  getReportAPI(){
    return this.http.get('http://localhost:3000/report')
  }
}
