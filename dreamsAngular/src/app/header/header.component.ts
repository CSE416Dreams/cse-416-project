import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SidenavServiceService } from '../services/sidenav-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() selectedState: string;
  @Input() changeState: (args: any) => void;

  noneSelected = "none";
  default = "Select a state";
  mississippi = "Mississippi";
  georgia = "Georgia";

  constructor(public sidenavService: SidenavServiceService) { }

  ngOnInit(): void {

  }



  openSidenav() {
    this.sidenavService.open();
  }

  closeSidenav() {
    this.sidenavService.close();
  }

}
