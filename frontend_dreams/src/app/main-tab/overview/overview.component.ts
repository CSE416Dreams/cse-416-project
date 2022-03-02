import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnChanges {
  @Input() selectedState: string;
  statePopulation: number;
  statePopulationString: string = "none";
  changeTnPopulation: number;
  changeInPopulationString: string = "none";
  numOfDistricts: number;
  changeInNumOfDistricts: number;
  stateParty: string = "none";
  stateWhite: number;
  stateWhiteChange: number;
  stateBlack: number;
  stateBlackChange: number;
  stateAsian: number;
  stateAsianChange: number;
  stateAIAN: number;
  stateAIANChange: number;
  stateNHOPI: number;
  stateNHOPIChange: number;
  stateHispanic: number;
  stateHispanicChange: number;
  stateDiversityIndex: number;
  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    switch(changes["selectedState"].currentValue) {
      case "Mississippi":
        this.numOfDistricts = 4;
        this.statePopulation = 2949965;
        this.statePopulationString = this.statePopulation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.changeTnPopulation = -6018
        this.changeInPopulationString = this.changeTnPopulation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.changeInNumOfDistricts = 0;
        this.stateParty = "Republican Party"
        this.stateWhite = 59.1
        this.stateWhiteChange = -4.0
        this.stateBlack = 37.8
        this.stateBlackChange = 12.9
        this.stateAsian = 1.1
        this.stateAsianChange = 52.3
        this.stateAIAN = 0.6
        this.stateAIANChange = 57.4
        this.stateNHOPI = 0.1
        this.stateNHOPIChange = 7.4;
        this.stateDiversityIndex = 55.9
        break;
      case "Georgia":
        this.numOfDistricts = 14;
        this.statePopulation = 10711908;
        this.statePopulationString = this.statePopulation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.changeTnPopulation = 1024255
        this.changeInPopulationString = this.changeTnPopulation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.changeInNumOfDistricts = 0;
        this.stateParty = "Republican Party"
        this.stateWhite = 60.2
        this.stateWhiteChange = -5.5
        this.stateBlack = 32.6
        this.stateBlackChange = -1.3
        this.stateAsian = 4.4
        this.stateAsianChange = 27.1
        this.stateAIAN = 0.5
        this.stateAIANChange = 9.4
        this.stateNHOPI = 0.1
        this.stateNHOPIChange = -2.8
        this.stateDiversityIndex = 64.1
        break;
    }
  }

}
