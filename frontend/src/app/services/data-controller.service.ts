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
  selectedDistrict: number = 1;
  currentMapIndex: number = 0;
  showSeawulfEnsemble: boolean = false;

  planList = ["Summary"];
  stateData = undefined;
  plansData = [];
  seawulfEnsembleData = undefined;

  constructor(
    public mapController: MapControllerService,
    public componentController: ComponentControllerService
  ) { }

  isReady() {
    if(this.stateData == undefined) {
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

  getStateData() {
    return this.stateData;
  }

  getShowSeawulfEnsemble() {
    return this.showSeawulfEnsemble;
  }

  getPlanData(index: number) {
    return this.plansData[index-1];
  }

  getCurrentPlanData() {
    if(this.selectedPlan == "Summary") {
      return;
    }
    return this.plansData[this.getSelectedPlanIndex()-1];
  }

  getSelectedDistrict() {
    return this.selectedDistrict;
  }

  getCurrentDistrictData() {
    return this.getCurrentPlanData().districts[this.selectedDistrict-1];
  }

  clearData() {
    this.stateData = undefined;
    this.plansData = [];
    this.selectedDistrict = 1;
    this.seawulfEnsembleData = undefined;
    this.selectedPlan = "Summary"
    this.planList = ["Summary"];
    return;
  }

  toggleSeawulfEnsemble() {
    this.showSeawulfEnsemble = !this.showSeawulfEnsemble;
    return;
  }

  resetShows() {
    this.showSeawulfEnsemble = false;
  }

  changeDistrict(number: number) {
    this.selectedDistrict = number;
  }

  changeState(string: string) {
    let oldState = this.selectedState;
    this.selectedState = string;
    this.mapController.flyTo(this.selectedState);
    this.resetShows();

    if(string == oldState) {
      return;
    }
    // Case : Going back to None
    if(string == "None" && oldState != "None") {
      this.clearData();
      this.mapController.hideCurrentMap(oldState, this.currentMapIndex)
      this.mapController.resetToInitial(oldState);
      this.currentMapIndex = 1;
      this.componentController.closeSidenav();
      return;
    }

    // Case : State to State, None to State
    this.clearData();
    this.getState();
    this.mapController.hideStateMap(this.selectedState);
    if(oldState != "None") {
      this.mapController.hideCurrentMap(oldState, this.currentMapIndex);
      this.mapController.resetToInitial(oldState);
    }
    this.currentMapIndex = 1;
    this.mapController.showDistrictMap(this.selectedState, this.currentMapIndex);
    this.componentController.openSidenav();
    return;
  }


  changeSelectedPlan(index: number) {
    this.selectedPlan = this.planList[index];

    if(this.currentMapIndex == index) {
      return;
    }
    this.selectedDistrict = 1;

    if(index == 0) {
      if(this.currentMapIndex == 1) {
        return;
      }
      else {
        this.mapController.hideCurrentMap(this.selectedState, this.currentMapIndex);
        this.mapController.showDistrictMap(this.selectedState, 1);
        this.currentMapIndex = 1;
        return;
      }
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

  returnTo() {
    this.mapController.flyTo(this.selectedState);
  }
  
  async getState() {
    await fetchState(this.selectedState)
    .then(result => {
      let jsonObj = JSON.parse(result);
      for(let i = 0; i < jsonObj.dps.length; i++) {
        if(jsonObj.dps[i].planStatus == "Approved") {
          this.planList.splice(1, 0, jsonObj.dps[i].planName);
          this.plansData.splice(0, 0, jsonObj.dps[i])
        }
        else {
          this.planList.push(jsonObj.dps[i].planName);
          this.plansData.push(jsonObj.dps[i]);
        }
      }
      this.stateData = jsonObj;

      console.log(this.stateData);
      console.log(this.plansData);
    })
    .catch(e => console.log(e));
  }

}


async function fetchState(selectedState: string) {
  // TODO: this should be fixed in the server-side
  let key = "";
  switch(selectedState) {
    case "Mississippi":
      key = "MS";
      break;
    case "Georgia":
      key = "GA";
      break;
    case "Florida":
      key = "FL";
      break;
  }
  let response = await fetch('http://localhost:8080/server/webapi/states/'+key);
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}
