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
  @Input() districtPlans;


  nameOfPlan: string = "none";
  proposedBy: string = "none";
  status: number = 0; 
  statusString = ["Enacted", "In litigation", "Rejected", "Randomly Generated"]
  date: string = "none";
  summary: string = "No summary";
  constructor(    private SpinnerService: NgxSpinnerService) { }  
 

  ngOnInit(): void { 
    districtPlanss = this.districtPlans;
  }
  ngAfterViewInit(): void { 
    
   }

  ngOnChanges(changes: SimpleChanges): void {

    
    switch(changes["selectedId"].currentValue) {
      case 1:
        this.nameOfPlan = this.selectedState=="Mississppi"? JSON.parse(districtPlanss[0]).planName :JSON.parse(districtPlanss[1]).planName  ;
        this.proposedBy =  this.selectedState=="Mississppi"? JSON.parse(districtPlanss[0]).proposedParty :JSON.parse(districtPlanss[1]).proposedParty  ;
        this.status = 0;
        this.date =  this.selectedState=="Mississppi"? JSON.parse(districtPlanss[0]).dateEnacted :JSON.parse(districtPlanss[1]).dateEnacted  ;
        this.summary = this.selectedState=="Mississppi"? JSON.parse(districtPlanss[0]).summary:JSON.parse(districtPlanss[1]).summary ;
        break;
      case 2:
        this.nameOfPlan =  "Democratic Proposed Plan"   ;
        this.proposedBy = "Democratic";
        this.status = 2;
        this.date =  this.selectedState=="Mississppi"? JSON.parse(districtPlanss[0]).dateEnacted :JSON.parse(districtPlanss[2]).dateEnacted ;
        this.summary = this.selectedState=="Georgia"?JSON.parse(districtPlanss[2]).summary :"No Summary" ;
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


