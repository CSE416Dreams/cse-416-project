import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  @Input() selectedState: string;
  constructor() { }

  ngOnInit(): void {
  }

  //Connecting backend here in each tabs accordingly with the selectedState will help us to fetch only what we need and process data within these tabs

}
