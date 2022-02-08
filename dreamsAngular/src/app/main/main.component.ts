import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as geojson from 'geojson';
import * as $ from '../../../node_modules/jquery/dist/jquery.min.js'

import * as worldMap from '../../../../State_GEOJSON/northAmerica.json';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit {
  
  private initMap(): void {
    // const map = L.map('map').setView([0, 0], 1);

    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   minZoom: 3,
    //   maxZoom: 18,
    //   attribution: '<a href=”http://www.openstreetmap.org/copyright">OpenStreetMap</a> '
    // }).addTo(map);
    
    var path = '../../../../State_GEOJSON/worldMap.json';
    var myCustomStyle = {
      stroke: false,
      fill: true,
      fillColor: '#fff',
      fillOpacity: 1
  }
    $.getJSON(path, function(data) {
      var map = L.map('map').setView([39.74, -105], 4);

      L.geoJSON(data, {
        style: myCustomStyle  
      }).addTo(map);
    })
  }

  constructor() { 
  }
  
  
  ngAfterViewInit(): void {
    this.initMap();
    
  }
}
