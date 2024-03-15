import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { SMSServiceService } from '../Services/smsservice.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ThemeService } from '../theme.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  selectedOption: string = '';

  CurrentDate=new Date(); 

  inputText: string = '';
  characterCount: number = 0;
  UserName='demotr';
  count: any;

  smsForm! :FormGroup;
  display:any
  selectedTemplateId:any;
  constructor(private service: SMSServiceService, private formbuilder:FormBuilder,private router:Router,
    private httpclient:HttpClient,private themeService: ThemeService){
    setInterval(()=>{
      this.CurrentDate=new Date()
    },1000)
  }

  ngOnInit(){
    this.loadcount()
  }
  loadcount(){
    this.service.getBalance(this.UserName).subscribe({
      next:((res:any)=>{
        this.count=res.SMSBalance
      })
    })

  }
}
