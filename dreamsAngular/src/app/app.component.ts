import { Component, Input, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavServiceService } from './services/sidenav-service.service';
import {MatAccordion} from '@angular/material/expansion';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dreamsAngular';
  selectedState = "Select a state";

  constructor() {

  }


  //change States
  changeState = (string: string) => {
    this.selectedState = string;
  }


}
