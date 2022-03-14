import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { SidenavService } from '../services/sidenav.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-main-tab',
  templateUrl: './main-tab.component.html',
  styleUrls: ['./main-tab.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class MainTabComponent implements OnInit, OnChanges {
  @ViewChild("tabs", {static: false}) tabs: MatTabGroup;
  @Input() selectedState;
  @Input() selectedId;
  @Input() changeId: (args: any) => void;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.tabs && changes['selectedState']) {
      this.tabs.selectedIndex = 0;
    }

  }


}
