import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MapService } from '../services/map.service';
import { SidenavService } from '../services/sidenav.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  @Input() selectedState;
  selectedId = 0;
  @ViewChild('drawer', { static: true }) public sidenav: MatDrawer;


  constructor(public sidenavService: SidenavService, public stateService: StateService) { }

  ngOnInit(): void {
    this.sidenavService.setMainSidenav(this.sidenav);
  }

  changeId = (value: number) => {
    this.selectedId = value;
    this.stateService.setId(value);
    
    // change the service value as well
  }



}
