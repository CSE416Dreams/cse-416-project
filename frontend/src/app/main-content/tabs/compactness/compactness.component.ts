import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DataControllerService } from 'src/app/services/data-controller.service';

@Component({
  selector: 'app-compactness',
  templateUrl: './compactness.component.html',
  styleUrls: ['./compactness.component.css']
})
export class CompactnessComponent implements OnInit {
  @Input() compactnessMeasure;

  constructor(public controller : DataControllerService) { }

  ngOnInit(): void {
  }

}
