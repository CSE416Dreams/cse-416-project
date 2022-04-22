import { Component, OnInit } from '@angular/core';
import { DataControllerService } from 'src/app/services/data-controller.service';

@Component({
  selector: 'app-district-plan-content',
  templateUrl: './district-plan-content.component.html',
  styleUrls: ['./district-plan-content.component.css']
})
export class DistrictPlanContentComponent implements OnInit {

  constructor(public controller: DataControllerService) { }

  ngOnInit(): void {
  }

  backToSummary() {
    this.controller.changeSelectedPlan(0);
  }

}
