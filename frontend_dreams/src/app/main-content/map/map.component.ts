import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Input() selectedState;
  @Input() selectedId;

  onCenter: boolean = true;

  constructor(public stateService: StateService, public mapService: MapService) { }

  ngAfterViewInit(): void {
      this.stateService.initMainMap();
      this.mapService.getMainMap().on('move', (e) => {
        this.onCenter = this.mapService.validateCenter(this.selectedState);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedState'].currentValue) {
      this.onCenter = true;
    }
  }


  returnTo() {
    this.onCenter = true;
    this.stateService.return();
  }

}
