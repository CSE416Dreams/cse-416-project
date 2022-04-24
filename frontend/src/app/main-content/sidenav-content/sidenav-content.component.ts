import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataControllerService } from 'src/app/services/data-controller.service';
import { CompareDialogComponent } from './compare-dialog/compare-dialog.component';

@Component({
  selector: 'app-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.css']
})
export class SidenavContentComponent implements OnInit {

  constructor(public controller: DataControllerService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  changeSelectedPlan(number: number) {
    this.controller.changeSelectedPlan(number);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CompareDialogComponent, {
      width: "100%",
      height: "90%",
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

}
