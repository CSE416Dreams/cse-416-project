import { Injectable } from '@angular/core';
import mapboxgl from 'mapbox-gl';

// Temporary Datas import
import mississippiCounty from '../main-content/map/TempData/mississippiCountyMap';
import georgiaCounty from '../main-content/map/TempData/georgiaCountyMap';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  mainMap: mapboxgl;
  centers = {
    None: [-100, 40],
    Mississippi: [-84.5, 32],
    Georgia: [-78, 32],
  };

  //
  currentState: string;
  // 0 Basic County
  // 1 Dominant Party
  // 2 Non-Dominant Party
  // all other numbers from Our pool
  currentId: number = 0;

  constructor() {}

  initMainMap() {
    this.currentState = 'None';
    this.currentId = 0;
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZ2drc3duZHVkMTIiLCJhIjoiY2t6eGNyYzkyMDA4MDJucXYzMXl6ZWRndyJ9.kvBVb9k31YIndDvMmfIhYQ';

    this.mainMap = new mapboxgl.Map({
      container: 'main-map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: this.centers.None,
      zoom: 4,
    });

    this.mainMap.addControl(
      new mapboxgl.NavigationControl({
        showCompass: false,
      }),
      'bottom-left'
    );
    this.mainMap.resize();

    this.selectNone();
  }

// These functions below will be called from StateService
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Go back to init position
  selectNone() {
    this.currentState = 'None';
    this.currentId = 0;
    // Remove all the layers and add the default here

    this.flyTo(this.currentState)
  }


  moveTo(state: string, id: number) {
    this.currentState = state;
    this.currentId = id;

    // addLayer - id checking
    // addSource - id checking
    // FlyTo
    this.flyTo(state);
  }


  returnTo() {
    this.flyTo(this.currentState);
  }






///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  addLayer(state: string, id: number) {
    switch (state) {
      case 'Mississippi':
        break;
      case 'Georgia':
        break;
      case 'None':
        break;
      default:
        break;
    }
  }

  addSource(state: string, id: number) {
    switch (state) {
      case 'Mississippi':
        break;
      case 'Georgia':
        break;
      case 'None':
        break;
      default:
        break;
    }
  }

  flyTo(state: string) {
    if (state == 'None') {
      this.mainMap.flyTo({
        center: this.centers.None,
        zoom: 4,
        bearing: 0,
        speed: 3,
        curve: 1,
        easing: (t) => t,
        essential: true,
      });

      return;
    }
    this.mainMap.flyTo({
      center: this.centers[state],
      zoom: 5.8,
      bearing: 0,
      speed: 3,
      curve: 1,
      easing: (t) => t,
      essential: true,
    });
  }

  removeCurrentMap() {
    this.mainMap.removeLayer(this.currentState);
    this.mainMap.removeSource(this.currentState);
  }


  getCenter() {
    return this.mainMap.center;
  }

  setId(value: number) {
    this.currentId = value;
  }

  getMainMap() {
    return this.mainMap;
  }

  getCenterList() {
    return this.centers;
  }
}
