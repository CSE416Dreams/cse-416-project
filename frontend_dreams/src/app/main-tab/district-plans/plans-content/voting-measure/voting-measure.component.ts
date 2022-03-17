import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-voting-measure',
  templateUrl: './voting-measure.component.html',
  styleUrls: ['./voting-measure.component.css']
})
export class VotingMeasureComponent implements OnInit {
  @Input() selectedState;
  @Input() selectedId;

  constructor() { }

  ngOnInit(): void {
  }

}
