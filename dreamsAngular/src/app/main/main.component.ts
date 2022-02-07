import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as geojson from 'geojson';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit {

  private initMap(): void {
    const map = L.map('map').setView([51, 0],13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 3,
      maxZoom: 18,
      attribution: '<a href=”http://www.openstreetmap.org/copyright">OpenStreetMap</a> '
    }).addTo(map);
  }
  constructor() { }
  
  ngAfterViewInit(): void {
    this.initMap();
  }
}
