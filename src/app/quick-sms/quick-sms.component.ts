import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { SMSServiceService } from '../Services/smsservice.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ThemeService } from '../theme.service';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-quick-sms',
  templateUrl: './quick-sms.component.html',
  styleUrls: ['./quick-sms.component.css']
})
export class QuickSmsComponent {

  selectedOption: string = '';
  mobcount: any;
  validMobCount= 0;
  invalidMobCount=0;
  mobControl = new FormControl('', [Validators.required]);
  msglength: any;
  textlength: any;
  limit: any=0;
  creditcount: any;

  // CurrentDate=new Date(); 

  inputText: string = '';
  wordCount: number = 0;
  characterCount: number = 0;
 

  // inputText: string = '';
  // characterCount: number = 0;

  mobileNoCount(){
    const mobileNumbers = this.smsForm.controls['mob'].value.split(',').map((number:any)=>number.trim());

    this.validMobCount = 0;
    this.invalidMobCount = 0;

    mobileNumbers.forEach((number:any)=>{
      if(number.length==10 && /^\d+$/.test(number)){
        this.validMobCount++;
      }else{
        this.invalidMobCount++;
      }
    });
    
  }

  clearText(event: any) {
    if (event.target.checked) {
      // Clear the textarea by resetting the FormControl value
      this.mobControl.reset('');
      // Reset the counters
      this.validMobCount = 0;
      this.invalidMobCount = 0;
    }
  }

  onMouseOver(){
    this.msglength=this.smsForm.controls['msg']
    console.log(this.msglength.value.length);
    this.textlength=this.msglength.value.length

    if(this.textlength<160)
    {
      this.limit=1;
    }
    else if(this.textlength %160==0){
      let temp=this.textlength/160;
      this.limit=Math.floor(temp);
    }
    else{
      let temp=this.textlength/160
      this.limit=Math.floor(temp)+1;
    }

    this.creditcount=this.validMobCount*this.limit;
  }
  // countWords() {
  //   // Trim whitespace from the beginning and end of the text
  //   let trimmedText = this.inputText.trim();
  //   // Split the text into an array of words
  //   let words = trimmedText.split(/\s+/);
  //   // Count the number of words
  //   this.wordCount = words.length;
  //   // Count the total number of characters
  //   this.characterCount = trimmedText.length;
  // }

  calculateCharacterCount(): void {
    this.characterCount = this.inputText.length;
  }

  smsForm! :FormGroup;
  display:any;
  submitted: any;
  selectedTemplateId:any;
  constructor(private service: SMSServiceService, private formbuilder:FormBuilder,private router:Router,
    private httpclient:HttpClient,private themeService: ThemeService){
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

  changevalue(event: Event): void{
    const templateid=(event.target as HTMLSelectElement).value;

    let message="";
    switch (templateid) {
      case '1707161891201501738':
        message = 'Your My SMS verification Code id . Do not share this code with others Team Nuevas';
        break;
      case '1707161855199873979':
        message = 'Dear User your OTP is  Kindly use OTP to validate your Registration. Team Trackzia';//match this with value in dropdown
        break;
      case '1707161899992775140':
        message = 'Dear  , Your Complaint with Complaint Id:  has Been Resolve Kindly Share OTP, The OTP is  \n From Nuevas';
        break;
      default:
        message = '';
        break;
    }
    this.smsForm.patchValue({
      msg: message
    });

}

onSubmit(){

  this.submitted=true;
  if(this.smsForm.invalid){
    alert('Please check all fileds')
    return;
  }

  this.service.getsms(this.smsForm.value).subscribe((res:any)=>{
    if(res.Success==true){

      alert("Message sent successfully!!")
      console.log(this.smsForm.value);
      console.log(res);
  
      this.service.userName=this.smsForm.value.username;
      localStorage.setItem('count',(this.service.userName));
    }
    else{
      alert('Something went wrong');
      console.log(res);
  }
  })
}
}