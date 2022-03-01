import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-main-tab',
  templateUrl: './main-tab.component.html',
  styleUrls: ['./main-tab.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class MainTabComponent implements OnInit, OnChanges {
  @Input() selectedState;
  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }


}
