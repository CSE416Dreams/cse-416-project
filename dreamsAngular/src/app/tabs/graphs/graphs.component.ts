import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit, OnChanges {
  @Input() selectedState;
  constructor() { }
  svg;
  margin = {top: 30, right: 30, bottom: 70, left: 60}
  width = 460 - this.margin.left - this.margin.right
  height = 400 - this.margin.top - this.margin.bottom;
  ngOnInit(): void {


  }

  ngOnChanges(changes: SimpleChanges): void {
      // access change thru      changes["selectedState"].currentValue
      // it is either None, Mississippi, Georgia
  }

}
