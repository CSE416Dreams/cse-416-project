import { Component, OnInit } from '@angular/core';
import { DataControllerService } from 'src/app/services/data-controller.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-district-plan-content',
  templateUrl: './district-plan-content.component.html',
  styleUrls: ['./district-plan-content.component.css']
})
export class DistrictPlanContentComponent implements OnInit {

  // single = [
  //   {
  //     "name": "Germany",
  //     "value": 8940000
  //   },
  //   {
  //     "name": "USA",
  //     "value": 5000000
  //   },
  //   {
  //     "name": "France",
  //     "value": 7200000
  //   }
  // ];
  // view: [number, number] = [700, 400];

  // showXAxis = true;
  // showYAxis = true;
  // gradient = false;
  // showLegend = true;
  // showXAxisLabel = true;
  // xAxisLabel = 'Country';
  // showYAxisLabel = true;
  // yAxisLabel = 'Population';

  // colorScheme: Color = {
  //   name: 'myScheme',
  //   selectable: true,
  //   group: ScaleType.Ordinal,
  //   domain: ['#f00', '#0f0', '#0ff'],
  // };


  constructor(public controller: DataControllerService) {
   }

  ngOnInit(): void {
  }

  backToSummary() {
    this.controller.resetShows();
    this.controller.changeSelectedPlan(0);
  }

}
