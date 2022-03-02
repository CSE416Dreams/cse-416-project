import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-plans-content',
  templateUrl: './plans-content.component.html',
  styleUrls: ['./plans-content.component.css']
})
export class PlansContentComponent implements OnInit, OnChanges {
  @Input() selectedState;
  @Input() selectedId;

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }


}
