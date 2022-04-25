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
    this.controller.initMainMap();
    this.mapService.getMainMap().on('moveend', (e) => {
      this.onCenter = this.mapService.validateCenter(this.controller.getSelectedState());
    });
  }

  selectMap(string: string) {
    console.log(string);
  }

  returnTo() {
    this.onCenter = true;
    this.controller.returnTo();
  }
}
