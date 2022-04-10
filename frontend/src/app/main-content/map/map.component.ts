import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataControllerService } from 'src/app/services/data-controller.service';
import { MapControllerService } from 'src/app/services/map-controller.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  onCenter: boolean = true;

  constructor(public mapService: MapControllerService, public controller: DataControllerService) { }

  ngAfterViewInit(): void {
    this.mapService.initMainMap();
      this.mapService.getMainMap().on('moveend', (e) => {
        this.onCenter = this.mapService.validateCenter(this.controller.getSelectedState());
      });
  }

  returnTo() {
    this.onCenter = true;
    this.controller.return();
    // this.stateService.return();
  }

}
