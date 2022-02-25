import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-additional-districts',
  templateUrl: './additional-districts.component.html',
  styleUrls: ['./additional-districts.component.css']
})
export class AdditionalDistrictsComponent implements OnInit, OnChanges {
  @Input() selectedState;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      
  }
}
