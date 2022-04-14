import { Injectable } from '@angular/core';
import mapboxgl from 'mapbox-gl';

import FloridaState from '../../../../State_GEOJSON/Florida/FloridaState';
import MississippiState from '../../../../State_GEOJSON/Mississippi/MississippiState';
import GeorgiaState from '../../../../State_GEOJSON/Georgia/GeorgiaState';


@Injectable({
  providedIn: 'root',
})
export class MapControllerService {
  mainMap: mapboxgl;
  hoveredState = null;

  centers = {
    None: [-100, 40],
    Mississippi: [-84.5, 32],
    Georgia: [-78, 32],
    Florida: [-77.5, 27],
  };

  constructor() {}

  getMainMap() {
    return this.mainMap;
  }

  initMainMap() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZ2drc3duZHVkMTIiLCJhIjoiY2wxdGxmeGp4MGRldzNqbnQwaDExdXZiNCJ9.2ZpdsgA1VbT8KKxe1ENl-A';

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
    this.mainMap.on('load', () => {
      this.initialMap();
    });
  }

  async getStates() {
    return this.getStates();
  }

  validateCenter(state: string) {
    if (
      this.mainMap.getCenter().lng != this.centers[state][0] ||
      this.mainMap.getCenter().lat != this.centers[state][1]
    ) {
      return false;
    } else return true;
  }


  removeMap(state: string) {
    this.mainMap.removeLayer(state);
    this.mainMap.removeSource(state);
  }

  async addSource(state: string, planIndex: number) {
    await fetchMap(state, 1).then(json => { // This should be planIndex instead
      let jsonObj = JSON.parse(json);
      this.mainMap.addSource(state, {
        type: 'geojson',
        data: jsonObj,
      });
    })
    .catch(e => console.log(e));
    // This data is to changed to index
  }

  addLayer(state: string) {
    this.mainMap.addLayer({
      id: state,
      type: 'fill',
      source: state,
      filter: ['==', '$type', 'Polygon'],
      layout: {},
      paint: {
        'fill-color': '#6488a1',
        'fill-opacity': 0.8,
      },
    });

    // this.mainMap.addLayer({
    //   id: state+"Line",
    //   type: 'line',
    //   source: state,
    //   paint: {
    //     'line-width': 1,
    //     'line-color': "#080808",
    //     'line-opacity': 0.8
    //   }
    // });
    // console.log(this.mainMap.getStyle().layers)
  }

  async showDistrictPlan(state: string, planIndex: number, fromNone: boolean) {
    this.removeMap(state);
    ///////////////////////////////////////////////////////////// has to be uncommented
    await this.addSource(state, planIndex);
    this.addLayer(state);
    /////////////////////////////////////////////////////////////
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // ONLY BASIC STATES FUNCTIONS
  resetToInitial(state: string) {
    ///////////////////////////////////////////////////////////// has to be uncommented
    this.removeMap(state);
    /////////////////////////////////////////////////////////////
    switch(state) {
      case "mississippi":
        this.initialMississippi();
        break;
      case "georgia":
        this.initialGeorgia();
        break;
      case "florida":
        this.initialFlorida();
        break;
    }
  }

  initialMap() {
    this.initialFlorida();
    this.initialGeorgia();
    this.initialMississippi();
  }

  initialFlorida() {
    this.mainMap.addSource('florida', {
      type: 'geojson',
      data: FloridaState,
    });
    this.mainMap.addLayer({
      id: 'florida',
      type: 'fill',
      source: 'florida',
      layout: {},
      paint: {
        'fill-color': '#808080',
        'fill-opacity': 0.5,
      },
    });
    this.enableHover("florida");
  }

  initialMississippi() {
    this.mainMap.addSource('mississippi', {
      type: 'geojson',
      data: MississippiState,
    });
    this.mainMap.addLayer({
      id: 'mississippi',
      type: 'fill',
      source: 'mississippi',
      layout: {},
      paint: {
        'fill-color': '#808080',
        'fill-opacity': 0.5,
      },
    });
    this.enableHover("mississippi");
  }

  initialGeorgia() {
    this.mainMap.addSource('georgia', {
      type: 'geojson',
      data: GeorgiaState,
    });
    this.mainMap.addLayer({
      id: 'georgia',
      type: 'fill',
      source: 'georgia',
      layout: {},
      paint: {
        'fill-color': '#808080',
        'fill-opacity': 0.5,
      },
    });
    this.enableHover("georgia");
  }

  enableHover(state : string) {
    this.mainMap.on('mouseenter', state, () => {
      this.mainMap.getCanvas().style.cursor = 'pointer';
      this.mainMap.setPaintProperty(state, 'fill-opacity', 0.8)
    });
    this.mainMap.on('mouseleave', state, () => {
      this.mainMap.getCanvas().style.cursor = '';
      this.mainMap.setPaintProperty(state, 'fill-opacity', 0.5)
    })
  }

  disableHover(state : string) {
    this.mainMap.off('mouseenter', state, () => {
      this.mainMap.getCanvas().style.cursor = 'pointer';
      this.mainMap.setPaintProperty(state, 'fill-opacity', 0.8)
    });
    this.mainMap.off('mouseleave', state, () => {
      this.mainMap.getCanvas().style.cursor = '';
      this.mainMap.setPaintProperty(state, 'fill-opacity', 0.5)
    })
  }
}

async function fetchMap(state: string, planIndex: number) {
  let response = await fetch('http://localhost:8080/server/webapi/maps/'+state+'-'+planIndex); // Need to fill this out
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}
