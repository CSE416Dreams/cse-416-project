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

  hideCurrentMap(state: string, planIndex: number) {
    this.mainMap.setLayoutProperty(state+"-"+planIndex, 'visibility', 'none');
  }

  showMap(state:string, planIndex: number) {
    this.mainMap.setLayoutProperty(state+"-"+planIndex, 'visibility', 'visible');
  }

  showDefaultMap(state: string) {
    if(this.mainMap.getSource(state+"-1") !== undefined) {
      this.showMap(state, 1);
      return;
    }


    // At this step, we will have to addSource , addLayer properly (with the popups, hover etc)
    this.mainMap.addSource(state+"-1", {
      type: 'geojson',
      data: 'https://hitboxes.github.io/'+state.toLowerCase()+'-1.geojson'
    })
    this.mainMap.addLayer({
      id: state+"-1",
      type: 'fill',
      source: state+'-1',
      filter: ['==', '$type', 'Polygon'],
      layout: {},
      paint: {
        'fill-color': '#6488a1',
        'fill-opacity': 0.8,
      }
    })
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

  // BASIC STATES FUNCTIONS
  // These functions are responsible for showing the state outlines so that the user can click on the map to choose a state.
  resetToInitial(state: string) {
    this.mainMap.setLayoutProperty(state.toLowerCase(), 'visibility', 'visible')

  }

  removeStateMap(state: string) {
    state = state.toLowerCase();
    this.mainMap.setLayoutProperty(state, 'visibility', 'none');
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
