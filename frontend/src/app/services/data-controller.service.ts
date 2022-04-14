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
  planList = ["Summary"]; // (e.g. ["Summary", "Rep.", "Dem.", "planName1"])
  districtPlansInfo = [];

  compactnessMeasure;
  populationMeasure;
  demographicsMeasure;
  geographicsMeasure;
  votingMeasure;

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

  getPlanList() {
    return this.planList;
  }

  getSelectedPlanIndex() {
    return this.planList.indexOf(this.selectedPlan);
  }

  getCompactnessMeasureJSON() {
    return this.compactnessMeasure;
  }
  getVotingMeasureJSON() {
    return this.votingMeasure;
  }
  getPopulationMeasureJSON() {
    return this.populationMeasure;
  }
  getDemographicsMeasureJSON() {
    return this.demographicsMeasure;
  }
  getGeographicsMeasureJSON() {
    return this.geographicsMeasure;
  }


  changeState(string: string) {

    let oldState = this.selectedState;
    if(string == oldState) {
      return;
    }
    this.selectedState = string;
    this.selectedPlan = "Summary";
    this.mapController.flyTo(this.selectedState);
    this.planList = ["Summary"];
    if(string == "None" && oldState != "None") {
      this.districtPlansInfo = [];
      this.mapController.resetToInitial(oldState.toLowerCase());
      this.componentController.closeSidenav();
      return;
    }
    this.getStateSummary();
    if(oldState != "None") {
      this.mapController.resetToInitial(oldState.toLowerCase());
    }
    // this.disableClick(this.selectedState.toLowerCase())
    this.mapController.showDistrictPlan(this.selectedState.toLowerCase(), 1); // always turn on the first map
    this.componentController.openSidenav();
    this.componentController.openFirstTab();
  }


  changeSelectedPlan(index: number) {
     this.selectedPlan = this.planList[index];
     this.componentController.openFirstTab(); // I dont know if this is wanted or not  (probably not?);
     this.getPlanSummary();



     return;
  }

  returnTo() {
    this.mapController.flyTo(this.selectedState);
  }
















  ////////////////////////// will check localStorage if there is data, using its key first in each of the get methods ***
  async getStateSummary() {
    await fetchState(this.selectedState).then(json => {
      let jsonObj = JSON.parse(json);

      for(let i = 0; i < jsonObj.planNames.length; i++) {
        this.planList.push(jsonObj.planNames[i]);
      }
      for(let i = 0; i < jsonObj.dps.length; i++) {
        this.districtPlansInfo.push(jsonObj.dps[i]);
      }
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

  async getCompactnessMeasure() {
    await fetchCompactnessMeasure(this.selectedState, this.getSelectedPlanIndex()).then(json => {
      let jsonObj = JSON.parse(json);
      this.compactnessMeasure = jsonObj;
    })
    .catch(e => console.log(e));
  }

  async getDemographicsMeasure() {
    await fetchDemographicsMeasure(this.selectedState, this.getSelectedPlanIndex()).then(json => {
      let jsonObj = JSON.parse(json);
      this.demographicsMeasure = jsonObj;
    })
    .catch(e => console.log(e));
  }

  async getGeographicsMeasure() {
    await fetchGeographicsMeasure(this.selectedState, this.getSelectedPlanIndex()).then(json => {
      let jsonObj = JSON.parse(json);
      this.geographicsMeasure = jsonObj;
    })
    .catch(e => console.log(e));
  }

  async getPopulationMeasure() {
    await fetchPopulationMeasure(this.selectedState, this.getSelectedPlanIndex()).then(json => {
      let jsonObj = JSON.parse(json);
      this.populationMeasure = jsonObj;
    })
    .catch(e => console.log(e));
  }

  async getVoteMeasure() {
    await fetchVoteMeasure(this.selectedState, this.getSelectedPlanIndex()).then(json => {
      let jsonObj = JSON.parse(json);
      this.votingMeasure = jsonObj;
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

async function fetchCompactnessMeasure(selectedState: string, selectedPlanIndex: number) {
  let response = await fetch('http://localhost:8080/server/webapi/plans/cmeasures/'+selectedState.toLowerCase()+'-plan'+selectedPlanIndex);
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}

async function fetchDemographicsMeasure(selectedState: string, selectedPlanIndex: number) {
  let response = await fetch('http://localhost:8080/server/webapi/plans/dmeasures/'+selectedState.toLowerCase()+'-plan'+selectedPlanIndex);
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}

async function fetchGeographicsMeasure(selectedState: string, selectedPlanIndex: number) {
  let response = await fetch('http://localhost:8080/server/webapi/plans/geomeasures/'+selectedState.toLowerCase()+'-plan'+selectedPlanIndex);
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}

async function fetchPopulationMeasure(selectedState: string, selectedPlanIndex: number) {
  let response = await fetch('http://localhost:8080/server/webapi/plans/popmeasures/'+selectedState.toLowerCase()+'-plan'+selectedPlanIndex);
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}

async function fetchVoteMeasure(selectedState: string, selectedPlanIndex: number) {
  let response = await fetch('http://localhost:8080/server/webapi/plans/votemeasures/'+selectedState.toLowerCase()+'-plan'+selectedPlanIndex);
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}
