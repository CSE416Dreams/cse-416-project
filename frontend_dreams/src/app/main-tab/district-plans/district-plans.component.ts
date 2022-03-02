import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-district-plans',
  templateUrl: './district-plans.component.html',
  styleUrls: ['./district-plans.component.css']
})
export class DistrictPlansComponent implements OnInit {
  @Input() selectedState: string;
  @Input() selectedId: number;
  @Input() changeId: (args: any) => void;
  @ViewChild('drawer', { static: true }) public sidenav: MatDrawer;

  constructor(public sidenavService: SidenavService) { }

  ngOnInit(): void {
    this.sidenavService.setDistrictSidenav(this.sidenav);
  }

}
