import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare-dialog',
  templateUrl: './compare-dialog.component.html',
  styleUrls: ['./compare-dialog.component.css']
})
export class CompareDialogComponent implements OnInit {
  compareStatus = false;

  constructor() { }

  ngOnInit(): void {
  }

  compare() {
    this.compareStatus = true;
  }

  goBack() {
    this.compareStatus = false;
  }

  close() {
    this.compareStatus = false;
  }

}
