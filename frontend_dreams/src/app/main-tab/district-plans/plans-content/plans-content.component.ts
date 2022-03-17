import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

let districtPlanss = "";
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
  summary: string = "No summary";
  constructor() { }


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {


    // switch(changes["selectedId"].currentValue) {
    //   case 1:
    //     this.nameOfPlan = this.selectedState=="Mississppi"? JSON.parse(districtPlanss[0]).planName :JSON.parse(districtPlanss[1]).planName  ;
    //     this.proposedBy =  this.selectedState=="Mississppi"? JSON.parse(districtPlanss[0]).proposedParty :JSON.parse(districtPlanss[1]).proposedParty  ;
    //     this.status = 0;
    //     this.date =  this.selectedState=="Mississppi"? JSON.parse(districtPlanss[0]).dateEnacted :JSON.parse(districtPlanss[1]).dateEnacted  ;
    //     this.summary = this.selectedState=="Mississppi"? JSON.parse(districtPlanss[0]).summary:JSON.parse(districtPlanss[1]).summary ;
    //     break;
    //   case 2:
    //     this.nameOfPlan =  "Democratic Proposed Plan"   ;
    //     this.proposedBy = "Democratic";
    //     this.status = 2;
    //     this.date =  this.selectedState=="Mississppi"? JSON.parse(districtPlanss[0]).dateEnacted :JSON.parse(districtPlanss[2]).dateEnacted ;
    //     this.summary = this.selectedState=="Georgia"?JSON.parse(districtPlanss[2]).summary :"No Summary" ;
    //     break;

    // }
  }




}


