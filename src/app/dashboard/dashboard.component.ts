import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { SMSServiceService } from '../Services/smsservice.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  selectedOption: string = '';

  CurrentDate=new Date(); 

  smsForm! :FormGroup;
  display:any
  router: any;
  constructor(private service: SMSServiceService, private formbuilder:FormBuilder){
    setInterval(()=>{
      this.CurrentDate=new Date()
    },1000)
  }

  ngOnInit(){
    this.smsForm=this.formbuilder.group({
      username:["demotr"],
      password:["tr@1234"],
      sender:[''],
      templateid:[''],
      mob:[''],
      msg:[''],
      coding:['1']
    });
  }

  changevalue(){
      this.smsForm.patchValue({
        msg:'Your My SMS verification Code id 1234. Do not share this code with others Team Nuevas'
      })
    }

    onSubmit(){
      this.service.getsms(this.smsForm.value).subscribe((res:any)=>{
        console.log(res);
        console.log(this.smsForm.value);
      });
    }

}
