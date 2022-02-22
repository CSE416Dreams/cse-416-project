import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
// Mapbox API import, jQuery for getJSON
import mapboxgl from 'mapbox-gl';

import mississippi from './mississippi_temp';
import georgia from './georgia_temp';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements AfterViewInit, OnChanges {
  @Input() selectedState: string;
  map: mapboxgl;
  currentLayer = [];

  private initMap(): void {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZ2drc3duZHVkMTIiLCJhIjoiY2t6eGNyYzkyMDA4MDJucXYzMXl6ZWRndyJ9.kvBVb9k31YIndDvMmfIhYQ';

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-100, 40],
      zoom: 3.5,
    });

    this.map.addControl(
      new mapboxgl.NavigationControl({
        showCompass: false,
      }),
      'top-left'
    );

    this.map.resize();
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeMap(changes['selectedState'].currentValue);
  }

  changeMap(state: string): void {
    //let isAtStart = false;

    //const start = [-74.5, 40];
    const endM = [-85, 32];
    const endG = [-79, 32];
    const endDefault = [-100, 40];
    let target;
    switch (state) {
      case 'Mississippi':
        this.removeCurrentMap();
        this.currentLayer.push(state);
        // and now we're at the opposite point
        target = endM;

        // This process has to be dynamic connected to a service
        this.map.addSource('Mississippi', {
          type: 'geojson',
          data: mississippi,
        });
        this.map.addLayer({
          id: 'Mississippi',
          type: 'fill',
          source: 'Mississippi',
          paint: {
            'fill-color': '#888888',
            'fill-opacity': 0.4,
          },
          filter: ['==', '$type', 'Polygon'],
        });
        this.map.flyTo({
          // These options control the ending camera position: centered at
          // the target, at zoom level 9, and north up.
          center: target,
          zoom: 5.8,
          bearing: 0,

          // These options control the flight curve, making it move
          // slowly and zoom out almost completely before starting
          // to pan.
          speed: 3, // make the flying slow
          curve: 1, // change the speed at which it zooms out

          // This can be any easing function: it takes a number between
          // 0 and 1 and returns another number between 0 and 1.
          easing: (t) => t,

          // this animation is considered essential with respect to prefers-reduced-motion
          essential: true,
        });
        break;
      // Georgia state show datas
      case 'Georgia':
        this.removeCurrentMap();
        this.currentLayer.push(state);
        target = endG;
        // This process has to be dynamic connected to a service
        this.map.addSource('Georgia', {
          type: 'geojson',
          data: georgia,
        });
        this.map.addLayer({
          id: 'Georgia',
          type: 'fill',
          source: 'Georgia',
          paint: {
            'fill-color': '#888888',
            'fill-opacity': 0.4,
          },
          filter: ['==', '$type', 'Polygon'],
        });
        this.map.flyTo({
          // These options control the ending camera position: centered at
          // the target, at zoom level 9, and north up.
          center: target,
          zoom: 5.8,
          bearing: 0,

          // These options control the flight curve, making it move
          // slowly and zoom out almost completely before starting
          // to pan.
          speed: 3, // make the flying slow
          curve: 1, // change the speed at which it zooms out

          // This can be any easing function: it takes a number between
          // 0 and 1 and returns another number between 0 and 1.
          easing: (t) => t,

          // this animation is considered essential with respect to prefers-reduced-motion
          essential: true,
        });
        break;
      case 'none':
        target = endDefault;
        this.removeCurrentMap();

        this.map.flyTo({
          // These options control the ending camera position: centered at
          // the target, at zoom level 9, and north up.
          center: target,
          zoom: 3.5,
          bearing: 0,

          // These options control the flight curve, making it move
          // slowly and zoom out almost completely before starting
          // to pan.
          speed: 3, // make the flying slow
          curve: 1, // change the speed at which it zooms out

          // This can be any easing function: it takes a number between
          // 0 and 1 and returns another number between 0 and 1.
          easing: (t) => t,

          // this animation is considered essential with respect to prefers-reduced-motion
          essential: true,
        });
        break;
      // default case for removing any maps
      default:

        break;
    }
  }
  removeCurrentMap() {
    for (let i = 0; i < this.currentLayer.length; i++) {
      this.map.removeLayer(this.currentLayer[i]);
      this.map.removeSource(this.currentLayer[i]);
    }
    this.currentLayer = [];
  }
}
