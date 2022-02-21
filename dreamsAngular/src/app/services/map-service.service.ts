import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapServiceService {
  selectedState: string = "Select a state";
  noneSelected = "Select a state";
  mississippi = "Mississippi";
  georgia = "Georgia";
  constructor() { }

  getSelectedState() {
    return this.selectedState;
  }

  changeState(string: string) {
    this.selectedState = string;
  }
}
