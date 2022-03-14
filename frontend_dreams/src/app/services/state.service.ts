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

  setId(value: number) {
    this.selectedId = value;
    this.mapService.setId(value);
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

  // resetting everything to None settings (home)
  reset() {
    this.sidenavService.closeMain();
    this.mapService.selectNone();
    // add methods that will reset everything
    return;
  }

  initMainMap() {
    this.mapService.initMainMap();
  }

  moveTo(state: string) {
    this.sidenavService.openMain();
    this.mapService.moveTo(state, 0);
  }


  return() {
    this.mapService.flyTo(this.selectedState);
  }
}
