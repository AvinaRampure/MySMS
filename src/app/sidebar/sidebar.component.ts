import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  selectedTheme: string = 'bright'; // Default theme

  changeTheme(theme: string) {
    this.selectedTheme = theme;
  }

}
