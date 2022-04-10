import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { DataControllerService } from 'src/app/services/data-controller.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  @ViewChild("tabs", {static: false}) tabs: MatTabGroup;

  constructor(public controller: DataControllerService) { }

  ngOnInit(): void {
  }

}
