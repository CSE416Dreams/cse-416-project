import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ListDialogComponent } from './list-dialog/list-dialog.component';

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

  // this will be fetched onChange of state variable
  // 0 is not going to be one of the options as it is the county info (default which will be when "None" is selected)
  options = ["Republican", "Democratic", "District 1", "District 2", "District 3", "District 4", "District 5", "District 6"];

  constructor(public sidenavService: SidenavService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.sidenavService.setDistrictSidenav(this.sidenav);
  }


  openDialog() {
    const dialogRef = this.dialog.open(ListDialogComponent, {
      width: "80%",
      height: "80%",
      disableClose: true,
      data: {
        options: this.options,
        selectedState: this.selectedState,
        
      }

    });
  }

}
