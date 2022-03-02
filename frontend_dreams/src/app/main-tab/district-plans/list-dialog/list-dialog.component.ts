import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.css']
})
export class ListDialogComponent implements OnInit {
  compareMode: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    // console.log(this.data);
  }



  compare() {
    this.compareMode = true;
  }

  goBack() {
    this.compareMode = false;
  }

  close() {
    this.compareMode = false;
  }

}