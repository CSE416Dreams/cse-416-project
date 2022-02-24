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
  PolsbyPopperValue: number;
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
  districtBlack: number;
  districtWhite: number;
  districtHispanic: number;
  districtAsian: number;
  districtIndian: number;
  districtNativeHawaiian: number;
  districtOther: number;

  constructor() { } // we would use a service to fetch info from backend depending on the selectedState

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.selectedDistrict = "none"
      switch(changes["selectedState"].currentValue) {
        case "Mississippi":
          this.numOfDistricts = 4;
          this.totalPopulationInt = 2949965;
          this.PolsbyPopperValue = .156;
          this.totalPopulationString = this.totalPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          // fetch
          this.districtList = ["District 1","District 2","District 3","District 4"];
          this.changeDistrict("District 1");
          break;
        case "Georgia":
          this.numOfDistricts = 14;
          this.totalPopulationInt = 10711908;
          this.PolsbyPopperValue = .259;
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
        // All Race Data in mississippi are place holders
        case "District 1":
          this.districtPopulationInt = 740319;
          this.districtPopulationString = this.districtPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.districtIncumbent = "Trent Kelly";
          this.districtPartisanLean = "R+35";
          this.districtWhite = 57.15;
          this.districtBlack = 27.85;
          this.districtHispanic = 7.81;
          this.districtAsian = 2.22;
          this.districtIndian = 0.24;
          this.districtNativeHawaiian = 0.16;
          this.districtOther = 0.44;
          break;
        case "District 2":
          this.districtPopulationInt = 740319;
          this.districtPopulationString = this.districtPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.districtIncumbent = "Bennie G. Thompson";
          this.districtPartisanLean = "D+23";
          this.districtWhite = 38.63;
          this.districtBlack = 50.89;
          this.districtHispanic = 5.71;
          this.districtAsian = 1.23;
          this.districtIndian = 0.19;
          this.districtNativeHawaiian = 0.1;
          this.districtOther = 0.33;
          break;
        case "District 3":
          this.districtPopulationInt = 740320;
          this.districtPopulationString = this.districtPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.districtIncumbent = "Michael Guest";
          this.districtPartisanLean = "R+28";
          this.districtWhite = 52.91;
          this.districtBlack = 34.22;
          this.districtHispanic = 6.7;
          this.districtAsian = 1.86;
          this.districtIndian = 0.21;
          this.districtNativeHawaiian = 0.11;
          this.districtOther = 0.37;
          break;
        case "District 4":
          this.districtPopulationInt = 740321;
          this.districtPopulationString = this.districtPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.districtIncumbent = "Steven Palazzo";
          this.districtPartisanLean = "R+42";
          this.districtWhite = 62.02;
          this.districtBlack = 24.51;
          this.districtHispanic = 6.75;
          this.districtAsian = 2.51;
          this.districtIndian = 0.18;
          this.districtNativeHawaiian = 0.04;
          this.districtOther = 0.51;
          break;
      }
    }
    else if(this.selectedState == "Georgia") {
      switch(this.selectedDistrict) {
        case "District 1":
          this.districtPopulationInt = 755781;
          this.districtPopulationString = this.districtPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.districtIncumbent = "Buddy Carter";
          this.districtPartisanLean = "R+20";
          this.districtWhite = 57.15;
          this.districtBlack = 27.85;
          this.districtHispanic = 7.81;
          this.districtAsian = 2.22;
          this.districtIndian = 0.24;
          this.districtNativeHawaiian = 0.16;
          this.districtOther = 0.44;
          break;
        case "District 2":
          this.districtPopulationInt = 673028;
          this.districtPopulationString = this.districtPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.districtIncumbent = "Sanford D. Bishop Jr.";
          this.districtPartisanLean = "D+4";
          this.districtWhite = 38.63;
          this.districtBlack = 50.89;
          this.districtHispanic = 5.71;
          this.districtAsian = 1.23;
          this.districtIndian = 0.19;
          this.districtNativeHawaiian = 0.1;
          this.districtOther = 0.33;
          break;
        case "District 3":
          this.districtPopulationInt = 763075;
          this.districtPopulationString = this.districtPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.districtIncumbent = "A. Drew Ferguson";
          this.districtPartisanLean = "R+38";
          this.districtWhite = 61.32;
          this.districtBlack = 25.27;
          this.districtHispanic = 6.48;
          this.districtAsian = 2.26;
          this.districtIndian = 0.21;
          this.districtNativeHawaiian = 0.05;
          this.districtOther = 0.48;
          break;
        case "District 4":
          this.districtPopulationInt = 773761;
          this.districtPopulationString = this.districtPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.districtIncumbent = "Hank Johnson";
          this.districtPartisanLean = "D+50";
          this.districtWhite = 20.75;
          this.districtBlack = 58.25;
          this.districtHispanic = 10.97;
          this.districtAsian = 5.72;
          this.districtIndian = 0.17;
          this.districtNativeHawaiian = 0.05;
          this.districtOther = 0.66;
          break;
        case "District 5":
          this.districtPopulationInt = 788126;
          this.districtPopulationString = this.districtPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.districtIncumbent = "Nikema Williams";
          this.districtPartisanLean = "D+60";
          this.districtWhite = 29.07;
          this.districtBlack = 54.17;
          this.districtHispanic = 8.36;
          this.districtAsian = 4.31;
          this.districtIndian = 0.17;
          this.districtNativeHawaiian = 0.04;
          this.districtOther = 0.53;
          break;
        case "District 6":
          this.districtPopulationInt = 765793;
          this.districtPopulationString = this.districtPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.districtIncumbent = "OPEN";
          this.districtPartisanLean = "R+24";
          this.districtWhite = 55.58;
          this.districtBlack = 12.42;
          this.districtHispanic = 14.04;
          this.districtAsian = 12.85;
          this.districtIndian = 0.13;
          this.districtNativeHawaiian = 0.04;
          this.districtOther = 0.78;
          break;
        case "District 7":
          this.districtPopulationInt = 859440;
          this.districtPopulationString = this.districtPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.districtIncumbent = "Carolyn Bourdeaux";
          this.districtPartisanLean = "D+16";
          this.districtWhite = 38.06;
          this.districtBlack = 19.79;
          this.districtHispanic = 20.87;
          this.districtAsian = 16.9;
          this.districtIndian = 0.16;
          this.districtNativeHawaiian = 0.04;
          this.districtOther = 0.64;
          break;
        case "District 8":
          this.districtPopulationInt = 719919;
          this.districtPopulationString = this.districtPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.districtIncumbent = "Austin Scott";
          this.districtPartisanLean = "R+35";
          this.districtWhite = 57.06;
          this.districtBlack = 30.55;
          this.districtHispanic = 6.93;
          this.districtAsian = 1.64;
          this.districtIndian = 0.2;
          this.districtNativeHawaiian = 0.04;
          this.districtOther = 0.32;
          break;
        case "District 9":
          this.districtPopulationInt = 775367;
          this.districtPopulationString = this.districtPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.districtIncumbent = "Andrew S. Clyde";
          this.districtPartisanLean = "R+46";
          this.districtWhite = 74.92;
          this.districtBlack = 6.35;
          this.districtHispanic = 13.19;
          this.districtAsian = 1.48;
          this.districtIndian = 0.21;
          this.districtNativeHawaiian = 0.04;
          this.districtOther = 0.33;
          break;
        case "District 10":
          this.districtPopulationInt =  775012;
          this.districtPopulationString = this.districtPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.districtIncumbent = "Jody Hice";
          this.districtPartisanLean = "R+31";
          this.districtWhite = 62.02;
          this.districtBlack = 24.51;
          this.districtHispanic = 6.75;
          this.districtAsian = 2.51;
          this.districtIndian = 0.18;
          this.districtNativeHawaiian = 0.04;
          this.districtOther = 0.51;
          break;
        case "District 11":
          this.districtPopulationInt = 802515;
          this.districtPopulationString = this.districtPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.districtIncumbent = "Barry Loudermilk";
          this.districtPartisanLean = "R+24";
          this.districtWhite = 62.48;
          this.districtBlack = 15.96;
          this.districtHispanic = 12.61;
          this.districtAsian = 3.51;
          this.districtIndian = 0.18;
          this.districtNativeHawaiian = 0.04;
          this.districtOther = 0.78;
          break;
        case "District 12":
          this.districtPopulationInt = 738624;
          this.districtPopulationString = this.districtPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.districtIncumbent = "Rick Allen";
          this.districtPartisanLean = "R+17";
          this.districtWhite = 52.91;
          this.districtBlack = 34.22;
          this.districtHispanic = 6.7;
          this.districtAsian = 1.86;
          this.districtIndian = 0.21;
          this.districtNativeHawaiian = 0.11;
          this.districtOther = 0.37;
          break;
        case "District 13":
          this.districtPopulationInt =  792916;
          this.districtPopulationString = this.districtPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.districtIncumbent = "David Scott";
          this.districtPartisanLean = "D+52";
          this.districtWhite = 20.76;
          this.districtBlack = 60.46;
          this.districtHispanic = 12.1;
          this.districtAsian = 2.44;
          this.districtIndian = 0.19;
          this.districtNativeHawaiian = 0.05;
          this.districtOther = 0.69;
          break;
        case "District 14":
          this.districtPopulationInt = 728551;
          this.districtPopulationString = this.districtPopulationInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.districtIncumbent = "Marjorie Taylor Greene";
          this.districtPartisanLean = "R+45";
          this.districtWhite = 72.85;
          this.districtBlack = 9.62;
          this.districtHispanic = 12.06;
          this.districtAsian = 1.03;
          this.districtIndian = 0.22;
          this.districtNativeHawaiian = 0.04;
          this.districtOther = 0.36;
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
