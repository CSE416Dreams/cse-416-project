import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-population-measure',
  templateUrl: './population-measure.component.html',
  styleUrls: ['./population-measure.component.css']
})
export class PopulationMeasureComponent implements OnInit {
  @Input() populationMeasure: any;
  panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
  }

}
