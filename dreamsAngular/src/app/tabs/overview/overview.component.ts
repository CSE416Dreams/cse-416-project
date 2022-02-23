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
  //Total Population Variables for total population for the state
  totalPopulationInt: number;
  totalPopulationString: string = "none";
  // Variables for Districts
  numOfDistricts: number;
  districtList: string[] = [];
  selectedDistrict: string = "none"
  populationofDistrictInt: number;
  populationofDistrictString: string = "none";
  districtPopulationInt: number;
  districtPopulationString: string = "none";
  districtIncumbent: string = "none";
  districtPartisanLean: string = "none";

  constructor() { } // we would use a service to fetch info from backend depending on the selectedState

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      switch(changes["selectedState"].currentValue) {
        case "Mississippi":
          this.numOfDistricts = 4;
          this.totalPopulationInt = 2949965;
          this.totalPopulationString = this.totalPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          // fetch
          this.districtList = ["District 1","District 2","District 3","District 4"];
          this.changeDistrict("District 1");
          break;
        case "Georgia":
          this.numOfDistricts = 14;
          this.totalPopulationInt = 10711908;
          this.totalPopulationString = this.totalPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.districtList = ["District 1","District 2","District 3","District 4","District 5","District 6", "District 7", "District 8", "District 9", "District 10", "District 11", "District 12", "District 13", "District 14"];
          this.changeDistrict("District 1");
          break;
      }
    }

  changeDistrict(district: string) {
    this.selectedDistrict = district;
    if(this.selectedState == "Mississippi") {
      switch(this.selectedDistrict) {
        case "District 1":
          this.districtPopulationInt = 740319;
          this.districtPopulationString = this.districtPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.districtIncumbent = "Trent Kelly";
          this.districtPartisanLean = "R+35";
          break;
        case "District 2":
          this.districtPopulationInt = 740319;
          this.districtPopulationString = this.districtPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.districtIncumbent = "Bennie G. Thompson";
          this.districtPartisanLean = "D+23";
          break;
        case "District 3":
          this.districtPopulationInt = 740320;
          this.districtPopulationString = this.districtPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.districtIncumbent = "Michael Guest";
          this.districtPartisanLean = "R+28";
          break;
        case "District 4":
          this.districtPopulationInt = 740321;
          this.districtPopulationString = this.districtPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.districtIncumbent = "Steven Palazzo";
          this.districtPartisanLean = "R+42";
          break;
      }
    }
    else if(this.selectedState == "Georgia") {
      switch(this.selectedDistrict) {
        case "District 1":
          this.districtIncumbent = "Buddy Carter";
          this.districtPartisanLean = "R+20";
          break;
        case "District 2":
          this.districtIncumbent = "Sanford D. Bishop Jr.";
          this.districtPartisanLean = "D+4";
          break;
        case "District 3":
          this.districtIncumbent = "A. Drew Ferguson";
          this.districtPartisanLean = "R+38";
          break;
        case "District 4":
          this.districtIncumbent = "Hank Johnson";
          this.districtPartisanLean = "D+50";
          break;
        case "District 5":
          this.districtIncumbent = "Nikema Williams";
          this.districtPartisanLean = "D+60";
          break;
        case "District 6":
          this.districtIncumbent = "OPEN";
          this.districtPartisanLean = "R+24";
          break;
        case "District 7":
          this.districtIncumbent = "Carolyn Bourdeaux";
          this.districtPartisanLean = "D+16";
          break;
        case "District 8":
          this.districtIncumbent = "Austin Scott";
          this.districtPartisanLean = "R+35";
          break;
        case "District 9":
          this.districtIncumbent = "Andrew S. Clyde";
          this.districtPartisanLean = "R+46";
          break;
        case "District 10":
          this.districtIncumbent = "Jody Hice";
          this.districtPartisanLean = "R+31";
          break;
        case "District 11":
          this.districtIncumbent = "Barry Loudermilk";
          this.districtPartisanLean = "R+24";
          break;
        case "District 12":
          this.districtIncumbent = "Rick Allen";
          this.districtPartisanLean = "R+17";
          break;
        case "District 13":
          this.districtIncumbent = "David Scott";
          this.districtPartisanLean = "D+52";
          break;
        case "District 14":
          this.districtIncumbent = "Marjorie Taylor Greene";
          this.districtPartisanLean = "R+45";
          break;
      }
    }
    else {

    }
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


  //Connecting backend here in each tabs accordingly with the selectedState will help us to fetch only what we need and process data within these tabs

}
