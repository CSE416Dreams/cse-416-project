import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { DialogueComponent } from './dialogue/dialogue.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dreamsAngular';
  selectedStates = "Select a state";
  noneSelected = "Select a state";
  mississippi = "Mississippi";
  georgia = "Georgia";
  constructor(public dialog : MatDialog) {

  }
  // open dialogue for option 1
  openDialog() {
    const dialogRef = this.dialog.open(DialogueComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //change States
  changeState(string: string) {
    this.selectedStates = string;
    
  }


}
