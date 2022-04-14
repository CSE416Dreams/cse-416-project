import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-demographics',
  templateUrl: './demographics.component.html',
  styleUrls: ['./demographics.component.css']
})
export class DemographicsComponent implements OnInit {
  @Input() demographicsMeasure: any;

  constructor() { }

  ngOnInit(): void {
  }

}
