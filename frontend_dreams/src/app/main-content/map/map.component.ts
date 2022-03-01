import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  constructor(public stateService: StateService) { }

  ngAfterViewInit(): void {
      this.stateService.initMainMap();
  }

}
