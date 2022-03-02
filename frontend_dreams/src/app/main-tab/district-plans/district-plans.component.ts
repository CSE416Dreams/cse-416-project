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
  options = ["Republican", "Democratic", "Generated 1", "Generated 2", "Generated 3", "Generated 4", "Generated 5", "Generated 6", "Generated 7", "Generated 8", "Generated 9", "Generated 10"];

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
        dialog: this.dialog
    
      }

    });
  }

}
