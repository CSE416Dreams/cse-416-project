import { Component, OnInit } from '@angular/core';
import { DataControllerService } from 'src/app/services/data-controller.service';

@Component({
  selector: 'app-data-source',
  templateUrl: './data-source.component.html',
  styleUrls: ['./data-source.component.css']
})
export class DataSourceComponent implements OnInit {

  constructor(public controller: DataControllerService) { }

  ngOnInit(): void {
  }

}
