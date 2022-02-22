import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Input() selectedState: string;
  constructor() { }

  ngOnInit(): void {
  }


}
