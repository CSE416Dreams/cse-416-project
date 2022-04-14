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
  compactnessMeasure: any;
  demographicsMeasure: any;
  geographicsMeasure: any;
  populationMeasure: any;
  votingMeasure: any;

  constructor(public controller: DataControllerService, public componentController: ComponentControllerService) { }

  ngOnInit(): void {
    this.componentController.setTabs(this.tabs);
  }

  changeSelectedPlan(number: number) {
    this.controller.changeSelectedPlan(number);
  }
  // may go away
  //////////////////////////////////////////////////////////////////////////
  async tabClick(tab) {
    this.controller.clearMeasures();
    switch(tab.tab.textLabel) {
      // case "Summary of the plan":
      //   this.controller.getPlanSummary();
      //   break;
      case "Compactness":
        await this.controller.getCompactnessMeasure();
        this.compactnessMeasure = this.controller.getCompactnessMeasureJSON();
        break;
      case "Demographics":
        await this.controller.getDemographicsMeasure();
        this.demographicsMeasure = this.controller.getDemographicsMeasureJSON();
        break;
      case "Geographics":
        await this.controller.getGeographicsMeasure();
        this.geographicsMeasure = this.controller.getGeographicsMeasureJSON();
        break;
      case "Population Measure":
        await this.controller.getPopulationMeasure();
        this.populationMeasure = this.controller.getPopulationMeasureJSON();
        break;
      case "Voting Measure":
        await this.controller.getVoteMeasure();
        this.votingMeasure = this.controller.getVotingMeasureJSON();
        break;
    }
    return;
  }
  //////////////////////////////////////////////////////////////////////////

  openDialog() {
    console.log("Compare button clicked!")
  }

}
