import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { DataControllerService } from 'src/app/services/data-controller.service';

@Component({
  selector: 'app-seawulf-ensemble-summary',
  templateUrl: './seawulf-ensemble-summary.component.html',
  styleUrls: ['./seawulf-ensemble-summary.component.css']
})
export class SeawulfEnsembleSummaryComponent implements OnInit {
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#f00', '#00f', '#f0f'],
  };

  SVData = [
    {
      "Florida" : [40.812, 10.296, 10.296]
    },
    {
      "Mississippi" : [36.857, 20.975, 2.298]
    },
    {
      "Georgia" : [12.5, 7.007, 1.836]
    }
  ];

  
  constructor(public controller: DataControllerService) { }

  ngOnInit(): void {
    

  }

}
