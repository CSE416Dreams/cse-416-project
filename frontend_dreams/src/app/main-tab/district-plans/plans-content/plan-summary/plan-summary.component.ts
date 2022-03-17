import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-summary',
  templateUrl: './plan-summary.component.html',
  styleUrls: ['./plan-summary.component.css']
})
export class PlanSummaryComponent implements OnInit {
  @Input() selectedState;
  @Input() selectedId;

  constructor() { }

  ngOnInit(): void {
  }

}
