import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DataControllerService } from '../services/data-controller.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ["None", "Mississippi", "Georgia"]
  filteredOptions: Observable<string[]>;

  @ViewChild(MatAutocompleteTrigger, {read: MatAutocompleteTrigger}) inputAutoComplete: MatAutocompleteTrigger;


  constructor(private _snackBar: MatSnackBar, public controller: DataControllerService) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  // esc button trigger
  clearInput() {
    this.inputAutoComplete.openPanel();
    this.myControl.setValue('');
    return;
  }

  // home button click trigger
  reset() {
    this.myControl.setValue('');
    this.controller.changeState("None");
    return;
  }

  // enter on input or select button click trigger
  setState() {
    if(!this.options.includes(this.myControl.value)) {
      this._snackBar.open("Please select a valid state!", 'Dismiss', {
        duration: 3000
      });
      return;
    }
    this.controller.changeState(this.myControl.value);
  }
}
