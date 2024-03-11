import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { SMSServiceService } from '../Services/smsservice.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // selectedOption: string = '';

  // CurrentDate=new Date(); 

  // inputText: string = '';
  // characterCount: number = 0;

  // calculateCharacterCount(): void {
  //   this.characterCount = this.inputText.length;
  // }

  // smsForm! :FormGroup;
  // display:any
  // selectedTemplateId:any;
  // constructor(private service: SMSServiceService, private formbuilder:FormBuilder,private router:Router,
  //   private httpclient:HttpClient,private themeService: ThemeService){
  //   setInterval(()=>{
  //     this.CurrentDate=new Date()
  //   },1000)
  // }

  // ngOnInit(){
  //   this.smsForm=this.formbuilder.group({
  //     username:["demotr"],
  //     password:["tr@1234"],
  //     sender:[''],
  //     templateid:[''],
  //     mob:[''],
  //     msg:[''],
  //     coding:['1']
  //   });
  // }

  // changevalue(event: Event): void{
  //   const templateid=(event.target as HTMLSelectElement).value;

  //   let message="";
  //   switch (templateid) {
  //     case '1707161891201501738':
  //       message = 'Your My SMS verification Code id . Do not share this code with others Team Nuevas';
  //       break;
  //     case '1707161855199873979':
  //       message = 'Dear User your OTP is  Kindly use OTP to validate your Registration. Team Trackzia';//match this with value in dropdown
  //       break;
  //     case '1707161899992775140':
  //       message = 'Dear  , Your Complaint with Complaint Id:  has Been Resolve Kindly Share OTP, The OTP is  \n From Nuevas';
  //       break;
  //     default:
  //       message = '';
  //       break;
  //   }
  //   this.smsForm.patchValue({
  //     msg: message
  //   });

  }



  // changevalue(){
  //   const selectedTemplateId = this.smsForm.get('templateid')?.value;

  //   if(selectedTemplateId  !== null && selectedTemplateId !== undefined){
  //     this.selectedTemplateId = this.templates.find(template => template.id === selectedTemplateId);

  //     if(selectedTemplateId){
  //       this.smsForm.patchValue({
  //         msg: selectedTemplateId.text
  //       });
  //     }else{
  //       console.log("Template not found for ID:",selectedTemplateId);
  //     }
  //   }else{
  //     console.log("Selected template ID is null or undefined")
  //   }
  //     // this.smsForm.patchValue({
  //     //   msg:'Your My SMS verification Code id 1234. Do not share this code with others Team Nuevas'
  //     // })
  //   }


