import { AfterViewInit, Component, OnInit } from '@angular/core';
// Mapbox API import, jQuery for getJSON
import mapboxgl from 'mapbox-gl';
import * as $ from '../../../node_modules/jquery/dist/jquery.min.js'; 

import geojson from "./testing";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit {
  
  private initMap(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2drc3duZHVkMTIiLCJhIjoiY2t6ZjF0YzJ4Mzg1NzJwbzA4cWdyd3RhNSJ9.VhqousDJ3yi7zD41jf9rlQ';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-100, 40],
      zoom: 3.5
    });



    map.addControl(new mapboxgl.NavigationControl({
      showCompass: false
    }), 'top-right');

    // This only works for URL I guess? 
    // $.getJSON("../../../../State_GEOJSON/MississippiStateDistricts.geojson", function(data) {
    //   console.log(data);  
    // });

    // This json is NOT geoJson, rather topoJson -> either need additional topoJSON api or find different json (geojson)

    
    console.log(geojson)
    //
    map.on('load', function () {


      map.addSource('mississippi', {
        type: 'geojson',
        data: geojson 
      });

      // this needs to be called after addsource
      map.addLayer({
        'id': 'mississippi',
        'type': 'fill',
        'source': 'mississippi',
        'paint': {
        'fill-color': '#888888',
        'fill-opacity': 0.4
        },
        'filter': ['==', '$type', 'Polygon']
      });
    })


  }

  constructor() {
  }


  ngAfterViewInit(): void {
    this.initMap();

  }
}
