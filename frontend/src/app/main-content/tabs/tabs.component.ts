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
    if(tab.tab.textLabel == "Measure1") {
      this.controller.measure1();
    }
    return;
  }
  //////////////////////////////////////////////////////////////////////////

  openDialog() {
    console.log("Compare button clicked!")
  }

}
