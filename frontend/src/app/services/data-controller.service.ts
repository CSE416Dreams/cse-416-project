import { Injectable } from '@angular/core';
import { ComponentControllerService } from './component-controller.service';
import { MapControllerService } from './map-controller.service';

@Injectable({
  providedIn: 'root'
})
export class DataControllerService {
  selectedState: string = "None";
  selectedPlan: number = 0;  // 0 is default (summary of all plans)
  planList = ["PlanName1", "PlanName2", "PlanName3"]; // This will be fetched as a string array (e.g. ["Rep.", "Dem.", "planName1"])   ////// selectedPlan will be the index of this list
  // PlanList has to be updated according to the selectedState
  //////////////////////////////////////////////////////////////////////////////////////////////////
  // This controller basically controls EVERYTHING INCLUDING THE MAP
  // This will include DATA fetching
  // Inside map-controller will have MAP fetching

  constructor(
    public mapService: MapControllerService,
    public componentController: ComponentControllerService
  ) { }


  getSelectedState() {
    return this.selectedState;
  }

  getSelectedPlan() {
    return this.selectedPlan;
  }

  getPlanList() {
    return this.planList;
  }

  getSelectedPlanName() {
    if(this.selectedPlan == 0) {
      return "Choose a plan";
    }
    return this.planList[this.selectedPlan-1];
  }

  // changing state which controls everything
  changeState(string: string) {
    this.selectedState = string;
    this.selectedPlan = 0;  // will fetch infos with these two varaibles ,,, id 0 is basically the current (enacted or proposed) plan
    this.mapService.flyTo(this.selectedState);
    if(string == "None") {
      this.componentController.closeSidenav();
      return;
    }
    this.componentController.openSidenav();
    this.componentController.openFirstTab();
  }

  // change the plan index
  changeSelectedPlan(index: number) {
     this.selectedPlan = index;
     // will have to change the map, and fetch info accordingly with the index

     return;
  }

  // Returning map to current selected state
  return() {
    this.mapService.flyTo(this.selectedState);
  }
}
