import { Component, OnInit } from '@angular/core';
import { DataControllerService } from 'src/app/services/data-controller.service';

@Component({
  selector: 'app-box-and-whisker',
  templateUrl: './box-and-whisker.component.html',
  styleUrls: ['./box-and-whisker.component.css']
})
export class BoxAndWhiskerComponent implements OnInit {

  constructor(public controller: DataControllerService) { }

  ngOnInit(): void {
  }

}
