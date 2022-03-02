import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-plans-content',
  templateUrl: './plans-content.component.html',
  styleUrls: ['./plans-content.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlansContentComponent implements OnInit, OnChanges {
  @Input() selectedState;
  @Input() selectedId;

  nameOfPlan: string = "none";
  proposedBy: string = "none";
  status: number = 0; 
  statusString = ["Enacted", "In litigation", "Rejected", "Randomly Generated"]
  date: string = "none";
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    switch(changes["selectedId"].currentValue) {
      case 1:
        this.nameOfPlan = "Republican Congressional District Plan"
        this.proposedBy = "Republican Party"
        this.status = 0;
        this.date = "December 31, 2021"
        break;
      case 2:
        this.nameOfPlan = "Democratic Congressional District Plan"
        this.proposedBy = "Democratic Party"
        this.status = 2;
        this.date = "December 31, 2021"
        break;
      case 3:
        this.nameOfPlan = "Randomly Generated Plan 1"
        this.proposedBy = "Dream Team"
        this.status = 3;
        this.date = "December 31, 2021"
        break;
      case 4:
        this.nameOfPlan = "Randomly Generated Plan 2"
        this.proposedBy = "Dream Team"
        this.status = 3;
        this.date = "December 31, 2021"
        break;
      case 5:
        this.nameOfPlan = "Randomly Generated Plan 3"
        this.proposedBy = "Dream Team"
        this.status = 3;
        this.date = "December 31, 2021"
        break;
      case 6:
        this.nameOfPlan = "Randomly Generated Plan 4"
        this.proposedBy = "Dream Team"
        this.status = 3;
        this.date = "December 31, 2021"
        break;
      case 7:
        this.nameOfPlan = "Randomly Generated Plan 5"
        this.proposedBy = "Dream Team"
        this.status = 3;
        this.date = "December 31, 2021"
        break;
      case 8:
        this.nameOfPlan = "Randomly Generated Plan 6"
        this.proposedBy = "Dream Team"
        this.status = 3;
        this.date = "December 31, 2021"
        break;
      case 9:
        this.nameOfPlan = "Randomly Generated Plan 7"
        this.proposedBy = "Dream Team"
        this.status = 3;
        this.date = "December 31, 2021"
        break;
      case 10:
        this.nameOfPlan = "Randomly Generated Plan 8"
        this.proposedBy = "Dream Team"
        this.status = 3;
        break;
      case 11:
        this.nameOfPlan = "Randomly Generated Plan 9"
        this.proposedBy = "Dream Team"
        this.status = 3;
        this.date = "December 31, 2021"
        break;
      case 12:
        this.nameOfPlan = "Randomly Generated Plan 10"
        this.proposedBy = "Dream Team"
        this.status = 3;
        this.date = "December 31, 2021"
        break;
    }
  }


}
