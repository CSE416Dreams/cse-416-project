import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  @Input() selectedState: string;

  status = 0; 
  statusString = ["Enacted", "In litigation", "Rejected"]
  // enacted, in litigation, rejected
  //    0   ,       1      ,     2
  constructor() { } // we would use a service to fetch info from backend depending on the selectedState

  ngOnInit(): void {
  }

  toggleStatus() {
    if(this.status == 0) {
      this.status = 1;
    }
    else if(this.status == 1) {
      this.status = 2;
    }
    else if(this.status == 2) {
      this.status = 0;
    }
  }
  //Connecting backend here in each tabs accordingly with the selectedState will help us to fetch only what we need and process data within these tabs

}
