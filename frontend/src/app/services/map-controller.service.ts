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
    None: [-90, 30],
    Mississippi: [-83, 32],
    Georgia: [-77, 32],
    Florida: [-77, 28]
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
      zoom: 4.5,
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

  validateCenter(state: string) {
    if (
      Math.round(this.mainMap.getCenter().lng) != this.centers[state][0] ||
      Math.round(this.mainMap.getCenter().lat) != this.centers[state][1]
    ) {
      return false;
    } else return true;
  }


  removeMap(state: string) {
  }

  async addSource(state: string, planIndex: number) {
    // await fetchMap(state, 1).then(json => { // This should be planIndex instead
    //   let jsonObj = JSON.parse(json);
    //   this.mainMap.addSource(state, {
    //     type: 'geojson',
    //     data: jsonObj,
    //   });
    // })
    // .catch(e => console.log(e));
    // This data is to changed to index
  }

  addLayer(state: string) {
    // this.mainMap.addLayer({
    //   id: state,
    //   type: 'fill',
    //   source: state,
    //   filter: ['==', '$type', 'Polygon'],
    //   layout: {},
    //   paint: {
    //     'fill-color': '#6488a1',
    //     'fill-opacity': 0.8,
    //   },
    // });

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

  flyTo(state: string) {
    if (state == 'None') {
      this.mainMap.flyTo({
        center: this.centers.None,
        zoom: 4.5,
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
      zoom: 5.5,
      bearing: 0,
      speed: 3,
      curve: 1,
      easing: (t) => t,
      essential: true,
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // BASIC STATES FUNCTIONS
  resetToInitial(state: string) {
    this.mainMap.setLayoutProperty(state.toLowerCase(), 'visibility', 'visible')

  }

  removeStateMap(state: string) {
    state = state.toLowerCase();
    this.mainMap.setLayoutProperty(state, 'visibility', 'none')
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
}

// This service will only have a map fetch -> getting the geojsons (preprocessed)

async function fetchMap(state: string, planIndex: number) {
  let response = await fetch('http://localhost:8080/server/webapi/maps/'+state+'-'+planIndex); // Need to fill this out
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}
