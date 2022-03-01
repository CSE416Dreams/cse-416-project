import { Injectable } from '@angular/core';
import { MapService } from './map.service';
import { SidenavService } from './sidenav.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  selectedState: string;
  constructor(
    public sidenavService: SidenavService,
    public mapService: MapService
  ) {}

  setState(state: string) {
    this.selectedState = state;
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
    this.selectedState = 'None';
    this.sidenavService.closeMain();
    // add methods that will reset everything
    return;
  }

  initMainMap() {
    this.mapService.initMainMap();
  }

  moveTo(state: string) {
    this.sidenavService.openMain();
  }
}
