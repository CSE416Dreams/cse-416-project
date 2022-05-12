import { Component, OnInit } from '@angular/core';
import {  MatExpansionPanel } from '@angular/material/expansion';
import { DataControllerService } from 'src/app/services/data-controller.service';

@Component({
  selector: 'app-state-summary',
  templateUrl: './state-summary.component.html',
  styleUrls: ['./state-summary.component.css'],
  viewProviders: [MatExpansionPanel]
})
export class StateSummaryComponent implements OnInit {

  constructor(public controller: DataControllerService) { }

  ngOnInit(): void {
  }

}
