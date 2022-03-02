import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
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
  @Input() options;

  @ViewChild('hello') optionList: MatSelectionList;

  
  constructor(public stateService: StateService) { }

  ngOnInit(): void {
  
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedState'] && changes['selectedId'] && this.optionList) {
      this.optionList.deselectAll();
    }
      // fetch arrodingly to the changes
  }



  



}
