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


  constructor(public controller: DataControllerService, public componentController: ComponentControllerService) { }

  ngOnInit(): void {
  }

  changeSelectedPlan(number: number) {
    this.controller.changeSelectedPlan(number);
  }

  openDialog() {
    console.log("Compare button clicked!")
  }

}
