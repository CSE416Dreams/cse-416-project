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
      console.log(jsonObj)
      this.mainMap.addSource(state, {
        type: 'geojson',
        data: jsonObj,
      });
      // assign variables here!!
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
    });
  }

  showDistrictPlan(state: string, planIndex: number) {
    this.removeMap(state);
    ///////////////////////////////////////////////////////////// has to be uncommented
    // this.addSource(state, planIndex);
    // this.addLayer(state);
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

  resetToInitial(state: string) {
    ///////////////////////////////////////////////////////////// has to be uncommented
    // this.removeMap(state);
    /////////////////////////////////////////////////////////////
    switch(state) {
      case "Mississippi":
        this.initialMississippi();
        break;
      case "Georgia":
        this.initialGeorgia();
        break;
      case "Florida":
        this.initialFlorida();
        break;
    }
    // this.enableHoverAndClick(state); This is not needed for some reason
  }

  initialMap() {
    this.initialFlorida();
    this.enableHoverAndClick("Florida");
    this.initialGeorgia();
    this.enableHoverAndClick("Georgia");
    this.initialMississippi();
    this.enableHoverAndClick("Mississippi");
  }

  initialFlorida() {
    this.mainMap.addSource('Florida', {
      type: 'geojson',
      data: FloridaState,
    });
    this.mainMap.addLayer({
      id: 'Florida',
      type: 'fill',
      source: 'Florida',
      layout: {},
      paint: {
        'fill-color': '#808080',
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          1,
          0.5
          ],
      },
    });
  }

  initialMississippi() {
    this.mainMap.addSource('Mississippi', {
      type: 'geojson',
      data: MississippiState,
    });
    this.mainMap.addLayer({
      id: 'Mississippi',
      type: 'fill',
      source: 'Mississippi',
      layout: {},
      paint: {
        'fill-color': '#808080',
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          1,
          0.5
          ],
      },
    });
  }

  initialGeorgia() {
    this.mainMap.addSource('Georgia', {
      type: 'geojson',
      data: GeorgiaState,
    });
    this.mainMap.addLayer({
      id: 'Georgia',
      type: 'fill',
      source: 'Georgia',
      layout: {},
      paint: {
        'fill-color': '#808080',
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          1,
          0.5
          ],
      },
    });
  }

  enableHoverAndClick(state : string) {
    this.mainMap.on('mouseenter', state, () => {
      this.mainMap.getCanvas().style.cursor = 'pointer'
    });
    // this.mainMap.on('mousemove', state, (e) => {
    //   if(e.features.length > 0) {
    //     this.mainMap.setFeatureState(
    //       { source: state, id: state },
    //       { hover: true }
    //     )
    //   }
    // })
    this.mainMap.on('mouseleave', state, () => {
      this.mainMap.getCanvas().style.cursor = '';
      // this.mainMap.setFeatureState(
      //   { source: state, id: state },
      //   { hover: false }
      // )
    })
    this.mainMap.on('click', state, (e) => {
      console.log(state);
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
