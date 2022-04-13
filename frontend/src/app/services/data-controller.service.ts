import { Injectable } from '@angular/core';
import { ComponentControllerService } from './component-controller.service';
import { MapControllerService } from './map-controller.service';

@Injectable({
  providedIn: 'root'
})
export class DataControllerService {
  selectedState: string = "None";
  selectedPlan: string = "Summary";
  planList = ["Summary", "PlanName1", "PlanName2", "PlanName3"]; // (e.g. ["Summary", "Rep.", "Dem.", "planName1"])

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


  changeState(string: string) {
    this.selectedState = string;
    this.selectedPlan = "Summary";
    this.mapController.flyTo(this.selectedState);
    if(string == "None") {
      this.componentController.closeSidenav();
      return;
    }
    this.componentController.openSidenav();
    this.componentController.openFirstTab();
  }


  changeSelectedPlan(index: number) {
     this.selectedPlan = this.planList[index];

     this.componentController.openFirstTab(); // I dont know if this is wanted or not  (probably not?);



     return;
  }

  return() {
    this.mapController.flyTo(this.selectedState);
  }

  async getState() {
    await fetchState(this.selectedState).then(json => {
      console.log(json);
    })
    .catch(e => console.log(e));
  }

  async getCompactnessMeasure() {
    await fetchCompactnessMeasure(this.selectedState, this.getSelectedPlanIndex()).then(json => {
      console.log(json);
      // assign variables here!!
    })
    .catch(e => console.log(e));
  }

  async getDemographicsMeasure() {
    await fetchDemographicsMeasure(this.selectedState, this.getSelectedPlanIndex()).then(json => {
      console.log(json);
      // assign variables here!!
    })
    .catch(e => console.log(e));
  }

  async getGeographicsMeasure() {
    await fetchGeographicsMeasure(this.selectedState, this.getSelectedPlanIndex()).then(json => {
      console.log(json);
      // assign variables here!!
    })
    .catch(e => console.log(e));
  }

  async getPopulationMeasure() {
    await fetchPopulationMeasure(this.selectedState, this.getSelectedPlanIndex()).then(json => {
      console.log(json);
      // assign variables here!!
    })
    .catch(e => console.log(e));
  }

  async getVoteMeasure() {
    await fetchVoteMeasure(this.selectedState, this.getSelectedPlanIndex()).then(json => {
      console.log(json);
      // assign variables here!!
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

async function fetchCompactnessMeasure(selectedState: string, selectedPlanIndex: number) {
  let response = await fetch('http://localhost:8080/server/webapi/plans/cmeasure/compactness-'+selectedState.toLowerCase()+'-plan'+selectedPlanIndex);
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}

async function fetchDemographicsMeasure(selectedState: string, selectedPlanIndex: number) {
  let response = await fetch('http://localhost:8080/server/webapi/plans/dmeasure/'+selectedState.toLowerCase()+'-plan'+selectedPlanIndex+'-demo');
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}

async function fetchGeographicsMeasure(selectedState: string, selectedPlanIndex: number) {
  let response = await fetch('http://localhost:8080/server/webapi/plans/geomeasures/'+selectedState.toLowerCase()+'-plan'+selectedPlanIndex+'-geo');
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}

async function fetchPopulationMeasure(selectedState: string, selectedPlanIndex: number) {
  let response = await fetch('http://localhost:8080/server/webapi/plans/popmeasures/'+selectedState.toLowerCase()+'-plan'+selectedPlanIndex+'-pop');
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}

async function fetchVoteMeasure(selectedState: string, selectedPlanIndex: number) {
  let response = await fetch('http://localhost:8080/server/webapi/plans/votemeasures/'+selectedState.toLowerCase()+'-plan'+selectedPlanIndex+'-vote');
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}



/* TODO by Tuesday

- Hover | click on a state from None state - GeoJson of states required

- showing the current plan when clicked on a state - GeoJson of the plans required, coloring required

- Each component in tabs to show some data - graphing tool, and other data points required accordingly


*/
