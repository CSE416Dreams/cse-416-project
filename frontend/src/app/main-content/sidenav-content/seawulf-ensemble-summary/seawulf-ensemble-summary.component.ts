import { Component, OnInit } from '@angular/core';
import { DataControllerService } from 'src/app/services/data-controller.service';

@Component({
  selector: 'app-seawulf-ensemble-summary',
  templateUrl: './seawulf-ensemble-summary.component.html',
  styleUrls: ['./seawulf-ensemble-summary.component.css']
})
export class SeawulfEnsembleSummaryComponent implements OnInit {

  constructor(public controller: DataControllerService) { }

  ngOnInit(): void {
  }

}
