import { Injectable } from '@angular/core';
import mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  mainMap: mapboxgl;
  centers = {
    "None": [-100, 40],
    "Mississippi": [-85, 32],
    "Georgia": [-79, 32]
  }


  constructor() { }

  initMainMap() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZ2drc3duZHVkMTIiLCJhIjoiY2t6eGNyYzkyMDA4MDJucXYzMXl6ZWRndyJ9.kvBVb9k31YIndDvMmfIhYQ';

    this.mainMap = new mapboxgl.Map({
      container: 'main-map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: this.centers.None,
      zoom: 3.5,
    });

    this.mainMap.addControl(
      new mapboxgl.NavigationControl({
        showCompass: false,
      }),
      'top-left'
    );
    this.mainMap.resize();
  }
}
