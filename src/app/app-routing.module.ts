import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { QuickSmsComponent } from './quick-sms/quick-sms.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {path: 'sidebar',component:SidebarComponent},
  {path: 'quick-sms',component:QuickSmsComponent},
  {path: 'report',component:ReportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
