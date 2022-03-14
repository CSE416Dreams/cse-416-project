import { Component, Input, OnInit, ViewChild,SimpleChanges } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ListDialogComponent } from './list-dialog/list-dialog.component';
// import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-district-plans',
  templateUrl: './district-plans.component.html',
  styleUrls: ['./district-plans.component.css']
})
export class DistrictPlansComponent implements OnInit {
  @Input() selectedState: string;
  @Input() selectedId: number;
  @Input() changeId: (args: any) => void;

  // this will be fetched onChange of state variable
  // 0 is not going to be one of the options as it is the county info (default which will be when "None" is selected)
  // options = ["Republican", "Democratic", "Generated 1", "Generated 2", "Generated 3", "Generated 4", "Generated 5", "Generated 6", "Generated 7", "Generated 8", "Generated 9", "Generated 10"];
  options = ["Republican", "Democratic"];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.loadPlan();

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

  // async loadPlan(){
  //   let districtPlan1 = await myFetch('plan-r-mississippi');
  //       myFetch('plan-r-mississippi').then(json => {
  //           districtPlan1 = json.toString();
  //       })
  //       .catch(e => console.log(e));
  //       console.log(districtPlan1);
  //   let districtPlan2 = await myFetch('plan-r-georgia');
  //     myFetch('plan-r-mississippi').then(json => {
  //         districtPlan2 = json.toString();
  //     })
  //     .catch(e => console.log(e));
  //   let districtPlan3 = await myFetch('plan-d-georgia');
  //     myFetch('plan-r-mississippi').then(json => {
  //         districtPlan2 = json.toString();
  //     })
  //     .catch(e => console.log(e));
  //     console.log(districtPlan2);
  //     this.districtPlans[0]=(districtPlan1);
  //     this.districtPlans[1]=(districtPlan2);
  //     this.districtPlans[2]=(districtPlan3);
  //     console.log(this.districtPlans);
  // }

}



// async function myFetch(plan) {
//   let response = await fetch('http://localhost:8080/server/webapi/plans/'+plan);
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   return await response.text();
// }

