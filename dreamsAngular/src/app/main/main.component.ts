import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
// Mapbox API import, jQuery for getJSON
import mapboxgl from 'mapbox-gl';

import mississippi from "./mississippi_temp";
import georgia from "./georgia_temp";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit, OnChanges {
  @Input() selectedStates : string;
  map;
  currentLayer = [];

  private initMap(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2drc3duZHVkMTIiLCJhIjoiY2t6ZjF0YzJ4Mzg1NzJwbzA4cWdyd3RhNSJ9.VhqousDJ3yi7zD41jf9rlQ';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-100, 40],
      zoom: 3.5
    });
    this.map.addControl(new mapboxgl.NavigationControl({
      showCompass: false
    }), 'top-right');
  }

  constructor() {
  }


  ngAfterViewInit(): void {
    this.initMap();

  }

  ngOnChanges(changes: SimpleChanges): void {
      this.changeMap(changes['selectedStates'].currentValue);
  }

  changeMap(state: string): void {
      switch(state) {
        case 'Mississippi':
          this.removeCurrentMap();
          this.currentLayer.push(state);
          
          // This process has to be dynamic connected to a service
          this.map.addSource('Mississippi', {
              type: 'geojson',
              data: mississippi 
            });
            this.map.addLayer({
              'id': 'Mississippi',
              'type': 'fill',
              'source': 'Mississippi',
              'paint': {
              'fill-color': '#888888',
              'fill-opacity': 0.4
              },
              'filter': ['==', '$type', 'Polygon']
            });
          break;
        // Georgia state show datas
        case 'Georgia':
          this.removeCurrentMap();
          this.currentLayer.push(state);

          // This process has to be dynamic connected to a service
          this.map.addSource('Georgia', {
            type: 'geojson',
            data: georgia
          });
          this.map.addLayer({
            'id': 'Georgia',
            'type': 'fill',
            'source': 'Georgia',
            'paint': {
            'fill-color': '#888888',
            'fill-opacity': 0.4
            },
            'filter': ['==', '$type', 'Polygon']
          });
          break;
        // default case for removing any maps
        default:
          this.removeCurrentMap();
          break;
      }
  }
  removeCurrentMap() {
    for(let i =0 ; i < this.currentLayer.length; i++) {
      this.map.removeLayer(this.currentLayer[i]);
      this.map.removeSource(this.currentLayer[i]);
    }
    this.currentLayer = [];
  }

  
}
