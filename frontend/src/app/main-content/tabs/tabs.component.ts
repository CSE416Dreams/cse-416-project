import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ComponentControllerService } from 'src/app/services/component-controller.service';
import { DataControllerService } from 'src/app/services/data-controller.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  @ViewChild("tabs", {static: true}) public tabs: MatTabGroup;

  constructor(public controller: DataControllerService, public componentController: ComponentControllerService) { }

  ngOnInit(): void {
    this.componentController.setTabs(this.tabs);
  }

  changeSelectedPlan(number: number) {
    this.controller.changeSelectedPlan(number);
  }
  // may go away
  //////////////////////////////////////////////////////////////////////////
  tabClick(tab) {
    switch(tab.tab.textLabel) {
      // case "Summary of the plan":
      //   this.controller.getPlanSummary();
      //   break;
      case "Compactness":
        this.controller.getCompactnessMeasure();
        break;
      case "Demographics":
        this.controller.getDemographicsMeasure();
        break;
      case "Geographics":
        this.controller.getGeographicsMeasure();
        break;
      case "Population Measure":
        this.controller.getPopulationMeasure();
        break;
      case "Voting Measure":
        this.controller.getVoteMeasure();
        break;
    }
    return;
  }
  //////////////////////////////////////////////////////////////////////////

  openDialog() {
    console.log("Compare button clicked!")
  }

}
