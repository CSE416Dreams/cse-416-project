import { Injectable } from '@angular/core';
import { ComponentControllerService } from './component-controller.service';
import { MapControllerService } from './map-controller.service';

@Injectable({
  providedIn: 'root'
})
export class DataControllerService {
  stateOptions = ['Mississippi', 'Georgia', 'Florida'];

  selectedState: string = "None";
  selectedPlan: string = "Summary";
  planList = ["Summary", "Plan 1", "Plan 2"];  // This will be fetched accordingly


  constructor(
    public mapController: MapControllerService,
    public componentController: ComponentControllerService
  ) { }

  getSelectedState() {
    return this.selectedState;
  }

  getSelectedPlan() {
    return this.selectedPlan;
  }

  getSelectedPlanIndex() {
    return this.planList.indexOf(this.selectedPlan);
  }

  getPlanList() {
    return this.planList;
  }


  changeState(string: string) {
    let oldState = this.selectedState;
    this.selectedState = string;
    this.selectedPlan = "Summary";
    // this.planList = ["Summary"];
    this.mapController.flyTo(this.selectedState);

    if(string == oldState) {
      return;
    }
    else if(string == "None" && oldState != "None") {
      // this.mapController.removeMap(oldState, index);
      this.mapController.resetToInitial(oldState, 1);
      this.componentController.closeSidenav();
      return;
    }

    // Valid (state to state, None to state)
    this.mapController.removeStateMap(this.selectedState);
    if(oldState != "None") {
      // this.mapController.removeMap(oldState, index);
      this.mapController.resetToInitial(oldState, 1);
    }
    // this.mapController.showDistrictPlan()
    this.componentController.openSidenav();
  }


  changeSelectedPlan(index: number) {
     this.selectedPlan = this.planList[index];
     return;
  }

  initMainMap() {
    this.mapController.initMainMap();
    for(let i = 0; i < this.stateOptions.length; i++) {
      this.mapController.getMainMap().on("click", this.stateOptions[i].toLowerCase(), () => {
        this.changeState(this.stateOptions[i]);
      })
    }
  }

  enableClick(state: string) {
    this.mapController.getMainMap().on("click", state.toLowerCase(), () => {
      this.changeState(state);
    })
  }

  returnTo() {
    this.mapController.flyTo(this.selectedState);
  }







//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Types of fetch we need

/*
1. state
  - This will fetch the SUMMARY of all district plans in a state (preferably everything calculated in the backend)

2. District plan
  - This will be upon choosing SPECIFIC district plan (everything calculated in the backend)

*MAY BE ADDED MORE
*/


  ////////////////////////// will check localStorage if there is data, using its key first in each of the get methods ***
  async getStateSummary() {
    await fetchState(this.selectedState).then(json => {
      let jsonObj = JSON.parse(json);
    })
    .catch(e => console.log(e));
  }

  async getPlanSummary() {
    await fetchDistrictPlanSummary(this.selectedState, this.getSelectedPlanIndex()).then(json => {

      // let jsonObj = JSON.parse(json);  // This is a bit buggy
      // assign varaibles here!
    })
    .catch(e => console.log(e));
  }
}


async function fetchState(selectedState: string) {
  let response = await fetch('http://localhost:8080/server/webapi/states/'+selectedState.toLowerCase());  /// URL has to be updated!!! I dont know which are available at the moment
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}

async function fetchDistrictPlanSummary(selectedState: string, selectedPlanIndex: number) {
  let response = await fetch('http://localhost:8080/server/webapi/plans/'+selectedState.toLowerCase()+'-plan'+selectedPlanIndex);  /// URL has to be updated!!! I dont know which are available at the moment
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}

