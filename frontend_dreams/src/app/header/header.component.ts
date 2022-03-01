import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  @Input() selectedState: string;
  @Input() changeState: (args: any) => void;


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


  reset() {
    this.myControl.setValue('');
    this.changeState("None");
  }


  setState() {
    if(!this.options.includes(this.myControl.value)) {
      this._snackBar.open("Please select a valid state!", 'Dismiss', {
        duration: 3000
      });
      return;
    }

    if(this.myControl.value == "None") { this.reset(); return;}
    this.changeState(this.myControl.value);
  }
}
