import { Component } from '@angular/core';
import { StateService } from './services/state.service';
import { MapService } from './services/map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedState = "None";
  title = 'frontend_dreams';

  constructor(public stateService: StateService, public mapService : MapService) {

  }

  changeState = (string: string) => {
    this.selectedState = string;
    this.stateService.setState(string);
  }

}
