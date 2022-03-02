import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-side-list',
  templateUrl: './side-list.component.html',
  styleUrls: ['./side-list.component.css']
})
export class SideListComponent implements OnInit, OnChanges {
  @Input() selectedState: string;
  @Input() selectedId: number;
  @Input() changeId: (args: any) => void;
  // this will be fetched onChange of state variable
  // 0 is not going to be one of the options as it is the county info (default which will be when "None" is selected)
  options = [1, 2, 3, 4, 5, 6, 7, 8];
  constructor(public stateService: StateService) { }

  ngOnInit(): void {
  
  }

  ngOnChanges(changes: SimpleChanges): void {
      // fetch arrodingly to the changes
  }


  



}
