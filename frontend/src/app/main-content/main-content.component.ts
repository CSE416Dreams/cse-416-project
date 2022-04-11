import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ComponentControllerService } from '../services/component-controller.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  @ViewChild('drawer', { static: true }) public sidenav: MatDrawer;

  constructor(public componentController: ComponentControllerService) { }

  ngOnInit(): void {
    this.componentController.setSidenav(this.sidenav);
  }

}
