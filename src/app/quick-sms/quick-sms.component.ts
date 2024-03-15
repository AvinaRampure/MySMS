import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SMSServiceService } from '../Services/smsservice.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ThemeService } from '../theme.service';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-quick-sms',
  templateUrl: './quick-sms.component.html',
  styleUrls: ['./quick-sms.component.css']
})
export class QuickSmsComponent {

  selectedOption: string = '';
  mobcount: any;
  validMobCount = 0;
  invalidMobCount = 0;
  checkBoxClr: boolean = false;
  mobControl = new FormControl('', [Validators.required]);
  msglength: any;
  textlength: any;
  limit: any = 0;
  creditcount: any;
  message: string= '';
  sender: string='';

  inputText: string = '';
  wordCount: number = 0;
  characterCount: number = 0;
  show: boolean = false;
  show1: boolean = false;
  show2: boolean = false;
  http: any;


  selectedTheme: string = 'bright'; // Default theme

  changeTheme(theme: string) {
    this.selectedTheme = theme;
  }

  mobileNoCount(value:string):void {
    const mobileNumbers = this.smsForm.controls['mob'].value.split(',').map((number: any) => number.trim());

    this.validMobCount = 0;
    this.invalidMobCount = 0;

    mobileNumbers.forEach((number: any) => {
      if (number.length == 10 && /^\d+$/.test(number)) {
        this.validMobCount++;
      } else {
        this.invalidMobCount++;
      }
    });

    this.creditcount = this.validMobCount * this.limit;

  }

  allExcelNumbers: any;

  onFileSelected(event:any):void{
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e:any)=>{
      const binaryString: string=e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(binaryString,{type: 'binary'});
      const sheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
      const contacts: any[]=XLSX.utils.sheet_to_json(worksheet, {header: 1});
      const  mobileNumbers: string[] =contacts.map(row => row[0]);

      const mobileNumbersString: string=mobileNumbers.join('\n');



      this.allExcelNumbers=mobileNumbersString
    };
    reader.readAsBinaryString(file);
  }
  importContacts():void{
    this.smsForm.patchValue({mob:this.allExcelNumbers});
  }


  checkBoxFun() {
    this.checkBoxClr = true
    this.smsForm.patchValue({
      mob: ''
    })
  }

  messageCount() {
    // this.msglength=this.smsForm.controls['msg']
    // console.log(this.msglength.value.length);
    // this.textlength=this.msglength.value.length

    this.smsForm.get('msg')!.valueChanges.subscribe(value => {
      this.textlength = value.length;
      if (this.textlength < 160) {
        this.limit = 1;
      }
      else if (this.textlength % 160 == 0) {
        let temp = this.textlength / 160;
        this.limit = Math.floor(temp);
      }
      else {
        let temp = this.textlength / 160
        this.limit = Math.floor(temp) + 1;
      }

      this.creditcount = this.validMobCount * this.limit;
    })

  }

  calculateCharacterCount(): void {
    this.characterCount = this.inputText.length;
  }

  smsForm!: FormGroup;
  display: any;
  submitted: any;
  selectedTemplateId: any;


  constructor(private service: SMSServiceService, private formbuilder: FormBuilder, private router: Router,
    private httpclient: HttpClient, private themeService: ThemeService) {

  }

  ngOnInit() {
    this.smsForm = this.formbuilder.group({
      username: ["demotr"],
      password: ["tr@1234"],
      sender: [''],
      templateid: [''],
      mob: [''],
      msg: [''],
      coding: ['1'],
    
    });

    
    this.smsForm.get('mob')!.valueChanges.subscribe(value=>{
      this.mobileNoCount(value)
    })
  }

  changevalue(event: Event): void {
    const templateid = (event.target as HTMLSelectElement).value;

    let message = "";
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
      this.messageCount();
    this.smsForm.patchValue({
      msg: message
    });

  }

  //schedule
  showSchedule: boolean = false;
  selectedDate!: string; // Mark as possibly undefined or null
  selectedTime!: string; 
  
  openDatePicker() {
    // Implement logic to open date picker
  }
  
  openTimePicker() {
    // Implement logic to open time picker
  }
  toggleSchedule() {
    this.showSchedule = !this.showSchedule;
  }
  //end schedule


selectAllCheckbox: boolean = false;
checkbox1: boolean = false;
checkbox2: boolean = false;
poolPhoneNumbers: string[] = ['9309580344', '8412819113'];
testPhoneNumbers: string[] = ['7038550566', '9960576419,9420930016']; 
selectedPhoneNumbers: string[] = [];

selectAllChanged() {
   debugger;
    this.selectAllCheckbox = !this.selectAllCheckbox;  
    this.checkbox1 = this.selectAllCheckbox;
    this.checkbox2 = this.selectAllCheckbox;
    console.log("this.checkbox1 :", this.checkbox1 )
    console.log("this.checkbox2 :", this.checkbox2 ) 
  
    this.updateSelectedPhoneNumbers();
}

checkboxChanged() {
  debugger;
  this.checkbox1 =!this.checkbox1;
  this.checkbox2 = !this.checkbox1;
    if (this.checkbox1 && this.checkbox2) {
        this.selectAllCheckbox = true;
    } else {
        this.selectAllCheckbox = false;
    }

    this.updateSelectedPhoneNumbers();
}

private updateSelectedPhoneNumbers() {
  if (this.checkbox1 && this.checkbox2) {
      this.selectedPhoneNumbers = [...this.poolPhoneNumbers, ...this.testPhoneNumbers];
  } else if (this.checkbox1) {
      this.selectedPhoneNumbers = [...this.poolPhoneNumbers];
  } else if (this.checkbox2) {
      this.selectedPhoneNumbers = [...this.testPhoneNumbers];
  } else {
      this.selectedPhoneNumbers = [];
  }
}


  downloadUrl: string = '';
  selectedFile: File | null = null;

  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     if (file.name.endsWith('.xls')) {
  //       console.log('Selected file:', file.name);
  //     } else {
  //       console.error('Invalid file format. Please select a .xls file.');
  //     }
  //   }
  // }

  uploadFile() {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.http.post('http://your-upload-endpoint', formData).subscribe((response: any) => {
        this.downloadUrl = response.downloadUrl;
      });
    }
  }



  onSubmit() {

    this.submitted = true;
    if (this.smsForm.invalid) {
      alert('Please check all fileds')
      return;
    }

    this.service.getsms(this.smsForm.value).subscribe((res: any) => {
      if (res.Success == true) {

        alert("Message sent successfully!!")
        console.log(this.smsForm.value);
        console.log(res);

        this.service.userName = this.smsForm.value.username;
        localStorage.setItem('count', (this.service.userName));

        this.service.ResArray=res;
        res.datetime = new Date; 
        res.Message = this.smsForm.value.msg;
        res.Credit = this.creditcount;
        res.Sender=this.smsForm.controls['sender'].value;
        res.SmsNo = this.validMobCount;
        this.service.postArrayAPI(res).subscribe({
          next:(res:any)=>{
            this.router.navigate(['report'])
            console.log(res);
          }
        })
      }
      else {
        alert('Something went wrong');
        console.log(res);
      }
    })
  }

  showOption() {
    this.show = !this.show
  }

  showChatbot() {
    this.show1 = !this.show1
  }

  showMedia() {
    this.show2 = !this.show2
  }

}