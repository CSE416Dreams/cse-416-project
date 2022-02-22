import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { SidenavServiceService } from '../services/sidenav-service.service';
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit{
  @Input() selectedState;
  @ViewChild('drawer', { static: true }) public sidenav: MatDrawer;

  constructor(public sidenavService: SidenavServiceService) { }

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

}
