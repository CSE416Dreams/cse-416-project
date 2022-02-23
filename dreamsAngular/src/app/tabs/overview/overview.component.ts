import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnChanges{
  @Input() selectedState: string;
  status: number = 0; 
  statusString = ["Enacted", "In litigation", "Rejected"]
  // enacted, in litigation, rejected
  //    0   ,       1      ,     2

  totalPopulation: number;

  numOfDistricts: number;
  districtList: string[] = [];
  selectedDistrict: string = "none"

  constructor() { } // we would use a service to fetch info from backend depending on the selectedState

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      switch(changes["selectedState"].currentValue) {
        case "Mississippi":
          this.numOfDistricts = 111;
          this.totalPopulation = 111111;
          // fetch
          this.districtList = ["MDist 1","Dist 2","Dist 3","Dist 4","Dist 5","Dist 6"]
          break;
        case "Georgia":
          this.numOfDistricts = 222;
          this.totalPopulation = 22222222;
          this.districtList = ["GDist 1","Dist 2","Dist 3","Dist 4","Dist 5","Dist 6"]
          break;
      }
  }

  changeDistrict(district: string) {
    this.selectedDistrict = district;
  }
  
  // Temp function that will be deleted
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


  numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  //Connecting backend here in each tabs accordingly with the selectedState will help us to fetch only what we need and process data within these tabs

}
