import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { DialogueComponent } from './dialogue/dialogue.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dreamsAngular';
  constructor(public dialog : MatDialog, public bottomSheet : MatBottomSheet) {

  }
  // open dialogue for option 1
  openDialog() {
    const dialogRef = this.dialog.open(DialogueComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // open bottom sheet for option 2
  openBottomSheet() {
    this.bottomSheet.open(BottomSheetComponent);
  }


}
