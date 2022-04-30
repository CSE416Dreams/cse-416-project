import { Component, OnInit } from '@angular/core';
import { DataControllerService } from 'src/app/services/data-controller.service';

@Component({
  selector: 'app-state-summary',
  templateUrl: './state-summary.component.html',
  styleUrls: ['./state-summary.component.css']
})
export class StateSummaryComponent implements OnInit {

  constructor(public controller: DataControllerService) { }

  ngOnInit(): void {
  }

}
