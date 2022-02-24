import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { MapControlService } from '../services/map-control.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements AfterViewInit, OnChanges {
  @Input() selectedState: string;

  onCenter: boolean = true;

  current_id = 0;

  constructor(public mapControlService: MapControlService) {}

  ngAfterViewInit(): void {
    this.mapControlService.initMap();
    this.mapControlService.getMap().on('mousedown', (e) => {
      if(this.mapControlService.getCenter() != this.mapControlService.getCenterList()[this.selectedState]) {
        this.onCenter = false;
      }
    });

    // this.map.on('mousedown', (e) => {
    //   if(this.map.center != this.centers[this.currentLayer]) {
    //     this.onCenter = false;
    //   }
    //   else {
    //     this.onCenter = true;
    //   }
    //   console.log(e);
    //   // get current center and compare it with the currentLayer center and if not change the boolean
    // })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedState'].currentValue) {
      this.mapControlService.changeState(changes['selectedState'].currentValue);
      this.onCenter = true;
      this.current_id = 0;
    }
    
  }

  // This method is called when a different plans are selected
  // id parameter is ::::
  // 0 for Republican
  // 1 for Democratic
  // 2 for Others (I don't know what the 3rd one is)
  changeMap_Plans(id: number) {
    this.mapControlService.changePlan(id);
    this.onCenter = true;
    this.current_id = id;
  }

  returnTo() {
    this.onCenter = true;
    this.mapControlService.returnTo();
  }




  
}
  
