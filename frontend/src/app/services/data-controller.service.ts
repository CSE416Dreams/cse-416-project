import { Injectable } from '@angular/core';
import { ComponentControllerService } from './component-controller.service';
import { MapControllerService } from './map-controller.service';

@Injectable({
  providedIn: 'root'
})
export class DataControllerService {

  selectedState: string = "None";
  selectedPlan: string = "Summary";
  selectedDistrict: number = 1;
  currentMap: string = "None"; // format = {state(lowercase)}-{planName}
  showSeawulfEnsemble: boolean = false;

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

  getSelectedDistrict() {
    return this.selectedDistrict;
  }

  getCurrentMap() {
    return this.currentMap;
  }

  getPlanData(index: number) {
    return this.plansData[index];
  }

  getCurrentPlanData() {
    return this.plansData.find(plan => plan.planName == this.selectedPlan);
  }

  getCurrentDistrictData() {
    return this.getCurrentPlanData().districts[this.selectedDistrict-1];
  }

  getShowSeawulfEnsemble() {
    return this.showSeawulfEnsemble;
  }

  getPlansData() {
    return this.plansData;
  }

  clearData() {
    this.stateData = undefined;
    this.plansData = [];
    this.selectedDistrict = 1;
    this.seawulfEnsembleData = false;
    this.selectedPlan = "Summary"
    return;
  }

  toggleSeawulfEnsemble() {
    this.showSeawulfEnsemble = !this.showSeawulfEnsemble;
    return;
  }

  resetShows() {
    this.showSeawulfEnsemble = false;
    return;
  }

  changeDistrict(number: number) {
    this.selectedDistrict = number;
    return;
  }

  async changeState(string: string) {
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
      this.mapController.hideCurrentMap(oldState, this.currentMap);
      this.currentMap = "None";
      this.mapController.resetToInitial(oldState);
      this.componentController.closeSidenav();
      return;
    }

    // // Case : State to State, None to State
    this.clearData();
    this.componentController.openSidenav();
    this.mapController.hideStateMap(this.selectedState);
    if(oldState != "None") {
      this.mapController.hideCurrentMap(oldState, this.currentMap);
      this.currentMap = "None";
      this.mapController.resetToInitial(oldState);
    }
    await this.getState();
    console.log(this.plansData);
    this.currentMap = this.plansData[0].planName;
    this.mapController.showDistrictMap(this.selectedState, this.currentMap);
    return;
  }


  changeSelectedPlan(index: number) {
    if(index == 0) {
      if(this.currentMap != this.plansData[0].planName) {
        this.mapController.hideCurrentMap(this.selectedState, this.currentMap);
        this.currentMap = this.plansData[0].planName;
        this.mapController.showDistrictMap(this.selectedState, this.currentMap);
      }
      this.resetShows();
      this.selectedPlan = "Summary";
      return;
    }
    // selecting the same plan
    if(this.selectedPlan == this.plansData[index-1].planName) {
      return;
    }

    this.selectedDistrict = 1;
    this.mapController.hideCurrentMap(this.selectedState, this.currentMap);
    this.selectedPlan = this.plansData[index-1].planName;
    this.currentMap = this.selectedPlan;
    this.mapController.showDistrictMap(this.selectedState, this.currentMap);

    console.log(this.getCurrentPlanData());
    return;
  }

  changeSelectedDistrict(number: number) {
    this.selectedDistrict = number;
    return;
  }

  changeMap(string: string) {
    this.mapController.hideCurrentMap(this.selectedState, this.currentMap);
    this.currentMap = string;
    this.mapController.showDistrictMap(this.selectedState, this.currentMap);
    return;
  }

  initMainMap() {
    this.mapController.initMainMap();
    let stateOptions = ['Mississippi', 'Georgia', 'Florida'];
    for(let i = 0; i < stateOptions.length; i++) {
      this.mapController.getMainMap().on("click", stateOptions[i].toLowerCase(), () => {
        this.changeState(stateOptions[i]);
      })
    }
    return;
  }

  returnTo() {
    this.mapController.flyTo(this.selectedState);
    return;
  }

  async getState() {
    await fetchState(this.selectedState)
    .then(result => {
      let jsonObj = JSON.parse(result);
      for(let i = 0; i < jsonObj.dps.length; i++) {
        if(jsonObj.dps[i].planStatus == "Approved") {
          this.plansData.splice(0, 0, jsonObj.dps[i])
        }
        else if(jsonObj.dps[i].planStatus == "Rejected") {
          this.plansData.push(jsonObj.dps[i]);
        }
        else {
          this.plansData.splice(1, 0, jsonObj.dps[i]);
        }
      }
      this.stateData = jsonObj;
    })
    .catch(e => console.log(e));
    return;
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
