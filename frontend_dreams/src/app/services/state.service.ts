import { Injectable, Input, Output } from '@angular/core';
import { MapService } from './map.service';
import { SidenavService } from './sidenav.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  selectedState: string = "None";
  selectedId: number = 0;

  constructor(
    public sidenavService: SidenavService,
    public mapService: MapService
  ) {}
  ////////////////////////////////////////////////////////////////////////////////////////
  setId(value: number) {
    this.selectedId = value;
    this.mapService.showMap(this.selectedState, this.selectedId);
  }

  setState(state: string) {
    this.selectedState = state;
    this.selectedId = 0;
    if (state == 'None') {
      // Dump all current data and go back to the US map with out anything
      this.reset();
      return;
    }
    // This method will change to one big method that contains everything within this service
    this.moveTo(state);
  }
  ////////////////////////////////////////////////////////////////////////////////////////

  // resetting everything to None settings (home)
  reset() {
    this.sidenavService.closeMain();
    this.mapService.flyTo("None");
    this.mapService.showMap('None', 0);
    // add methods that will reset everything
    return;
  }

  initMainMap() {
    this.mapService.initMainMap();
  }

  // Called upon setState (changing state)
  moveTo(state: string) {
    this.sidenavService.openMain();
    this.mapService.flyTo(state);
    // console.log("MoveTo called!")  only called once
    this.mapService.showMap(state, 0);
    // let districtPlan1 = await myFetch('plan-r-mississippi');
    //     myFetch('plan-r-mississippi').then(json => {
    //         districtPlan1 = json.toString();
    //     })
    //     .catch(e => console.log(e));
    //     console.log(districtPlan1);
  }

  return() {
    this.mapService.flyTo(this.selectedState);
  }
}


async function myFetch(plan) {
  let response = await fetch('http://localhost:8080/server/webapi/plans/'+plan);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}
