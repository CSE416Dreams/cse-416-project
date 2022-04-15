import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-geographics',
  templateUrl: './geographics.component.html',
  styleUrls: ['./geographics.component.css']
})
export class GeographicsComponent implements OnInit {
  @Input() geographicsMeasure: any;
  panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
  }

}
