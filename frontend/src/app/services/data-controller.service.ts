import { Injectable } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { ComponentControllerService } from './component-controller.service';
import { MapControllerService } from './map-controller.service';

@Injectable({
  providedIn: 'root'
})
export class DataControllerService {
  stateOptions = ['Mississippi', 'Georgia', 'Florida'];

  selectedState: string = "None";
  selectedPlan: string = "Summary";
  currentMapIndex: number = 0;
  showSeawulfEnsemble: boolean = false;

  planList = ["Summary", "Plan 1", "Plan 2"];  // This will be fetched accordingly
  stateData = {};
  districtPlanData = {};
  seawulfEnsembleData = undefined;

  constructor(
    public mapController: MapControllerService,
    public componentController: ComponentControllerService
  ) { }

  isReady() {
    if(this.stateData == undefined || this.districtPlanData == undefined) {
      return false;
    }
    return true;
  }

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

  getShowSeawulfEnsemble() {
    return this.showSeawulfEnsemble;
  }

  clearData() {
    this.stateData = undefined;
    this.districtPlanData = undefined;
    this.seawulfEnsembleData = undefined;
    return;
  }

  toggleSeawulfEnsemble() {
    this.showSeawulfEnsemble = !this.showSeawulfEnsemble;
    return;
  }

  resetShows() {
    this.showSeawulfEnsemble = false;
  }

  changeState(string: string) {
    let oldState = this.selectedState;
    this.selectedState = string;
    this.mapController.flyTo(this.selectedState);
    this.resetShows();

    if(string == oldState) {
      return;
    }
    else if(string == "None" && oldState != "None") {
      // this.clearData();
      // this.selectedPlan = "Summary"
      // this.planList = ["Summary"];
      // remove the current showing map
      this.mapController.hideCurrentMap(oldState, this.currentMapIndex)
      this.mapController.resetToInitial(oldState);
      this.currentMapIndex = 1;
      this.componentController.closeSidenav();
      return;
    }

    // Valid (state to state, None to state)
    this.selectedPlan = "Summary";
    // this.getDataForState(this.selectedState);
    this.mapController.removeStateMap(this.selectedState);
    if(oldState != "None") {
      // remove the current showing map
      this.mapController.hideCurrentMap(oldState, this.currentMapIndex);
      this.mapController.resetToInitial(oldState);
    }
    this.currentMapIndex = 1;
    this.mapController.showDistrictMap(this.selectedState, this.currentMapIndex);
    this.componentController.openSidenav();
  }


  changeSelectedPlan(index: number) {
    this.selectedPlan = this.planList[index];
    if(index == 0) {
      if(this.currentMapIndex == 1) {
        return;
      }
      this.mapController.hideCurrentMap(this.selectedState, this.currentMapIndex);
      this.mapController.showDistrictMap(this.selectedState, 1);
      this.currentMapIndex = 1;
      return;
    }

    if(this.currentMapIndex == index) {
      return;
    }
    this.mapController.hideCurrentMap(this.selectedState, this.currentMapIndex);
    this.mapController.showDistrictMap(this.selectedState, index);
    this.currentMapIndex = index;
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

  async getStateData(state: string) {
    // check localStorage if theres any data and update
    // if not fetch
  }

  returnTo() {
    this.mapController.flyTo(this.selectedState);
  }


  ////////////////////////// will check localStorage if there is data, using its key first in each of the get methods ***
  async getState() {
    await fetchState(this.selectedState).then(json => {
      let jsonObj = JSON.parse(json);
      // update PlanList
      // update data
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
