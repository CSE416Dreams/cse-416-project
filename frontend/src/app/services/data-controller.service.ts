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
    this.selectedState = string.toLowerCase();
    this.selectedPlan = 0;
    this.mapService.flyTo(this.selectedState);
    if(string == "none") {
      this.componentController.closeSidenav();
      return;
    }
    this.componentController.openSidenav();
    this.componentController.openFirstTab();
  }

  // change the plan index
  changeSelectedPlan(index: number) {
     this.selectedPlan = index;

     this.componentController.openFirstTab(); // I dont know if this is wanted or not  (probably not?)



     return;
  }

  async measure1() {
    await fetchVoteMeasure(this.selectedState, this.selectedPlan).then(json => {
      console.log(json);
      // assign variables here!!
    })
    .catch(e => console.log(e));
  }

  // Returning map to current selected state
  return() {
    this.mapService.flyTo(this.selectedState);
  }
}


async function fetchState(selectedState: string) {
  let response = await fetch('http://localhost:8080/server/webapi/');  /// URL has to be updated!!! I dont know which are available at the moment
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}

async function fetchVoteMeasure(selectedState: string, selectedPlan: number) {
  let response = await fetch('http://localhost:8080/server/webapi/plans/votemeasures/'+selectedState+'-plan'+selectedPlan+'-vote');
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}
// Something like this for each measure object we want to fetch,,,,
// ADD according variables to this file

// For now the categories are -------------------------------------------------------------------
/*
  - State (first click on state) - summary of all plans
  - Voting measure
  - Demographic measure
  - Population measure
  - Geographics measure

  - Rep/Dem splits
  - Box & Whisker
  - Seats to Votes
  - Radar Plots
*/

// async function fetchDemographicMeasure(selectedState: string, selectedPlan: number) {
//   let response = await fetch('http://localhost:8080/server/webapi/plans/votemeasures/'+selectedState+'-plan'+selectedPlan+'-vote');
//   if(!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   return await response.text();
// }

// async function fetchPopulationMeasure(selectedState: string, selectedPlan: number) {
//   let response = await fetch('http://localhost:8080/server/webapi/plans/votemeasures/'+selectedState+'-plan'+selectedPlan+'-vote');
//   if(!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   return await response.text();
// }

/*

*/





/* TODO by Tuesday

- Hover | click on a state from None state - GeoJson of states required

- showing the current plan when clicked on a state - GeoJson of the plans required, coloring required

- Each component in tabs to show some data - graphing tool, and other data points required accordingly

- Center change for florida (scales on different laptops are different so idk)


*/
