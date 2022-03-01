import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ["None", "Mississippi", "Georgia"]
  filteredOptions: Observable<string[]>;


  constructor(public stateService: StateService, private _snackBar: MatSnackBar) { }

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


  setState() {
    if(!this.options.includes(this.myControl.value)) {
      this._snackBar.open("Please select a valid state!", 'Dismiss', {
        duration: 3000
      });
      return;
    }
    this.stateService.setState(this.myControl.value);
  }
}
