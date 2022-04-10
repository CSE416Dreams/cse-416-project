import { Injectable } from '@angular/core';
import { MapControllerService } from './map-controller.service';
import { SidenavService } from './sidenav.service';

@Injectable({
  providedIn: 'root'
})
export class DataControllerService {
  selectedState: string = "None";

  constructor(
    public mapService: MapControllerService,
    public sidenavService: SidenavService
  ) { }


  getSelectedState() {
    return this.selectedState;
  }

  // First step
  changeState(string: string) {
    this.selectedState = string;
    this.mapService.flyTo(this.selectedState);
    if(string == "None") {
      this.sidenavService.close();
      return;
    }
    this.sidenavService.open();
  }

  // Returning map to current selected state
  return() {
    this.mapService.flyTo(this.selectedState);
  }
}
