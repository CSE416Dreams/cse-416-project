import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-political-fairness',
  templateUrl: './political-fairness.component.html',
  styleUrls: ['./political-fairness.component.css']
})
export class PoliticalFairnessComponent implements OnInit {
  @Input() selectedState;
  @Input() selectedId;

  constructor() { }

  ngOnInit(): void {
  }

}
