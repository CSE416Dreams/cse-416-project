import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'dialog-component',
  templateUrl: 'dialog.component.html',
})
export class DialogComponent {
  constructor(public dialog: MatDialog) {
    
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
 }

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-dialog.html',
})
export class DialogContentExampleDialog {}


/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */