import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MapServiceService } from '../services/map-service.service';
import { SidenavServiceService } from '../services/sidenav-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() selectedState: string;
  @Input() changeState: (args: any) => void;

  noneSelected = "Select a state";
  mississippi = "Mississippi";
  georgia = "Georgia";

  constructor(public sidenavService: SidenavServiceService) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
   
  }

  openSidenav() {
    this.sidenavService.open();
  }

  closeSidenav() {
    this.sidenavService.close();
  }

}
