import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  CurrentDate=new Date(); 
  show: boolean = false;

  constructor( private httpclient:HttpClient){
    setInterval(()=>{
      this.CurrentDate=new Date()
    },1000)
  }

  
  showChart() {
    this.show = !this.show
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

}
