import { Component, Input, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MapServiceService } from './services/map-service.service';
import { SidenavServiceService } from './services/sidenav-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dreamsAngular';
  selectedState = "Select a state";
  @ViewChild('sidenav') public sidenav: MatSidenav;
  constructor() {

  }


  //change States
  changeState = (string: string) => {
    this.selectedState = string;
    
  }


}
