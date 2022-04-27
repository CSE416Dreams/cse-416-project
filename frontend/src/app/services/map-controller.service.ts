import { Injectable } from '@angular/core';
import mapboxgl from 'mapbox-gl';

import FloridaState from '../../../../State_GEOJSON/Florida/FloridaState';
import MississippiState from '../../../../State_GEOJSON/Mississippi/MississippiState';
import GeorgiaState from '../../../../State_GEOJSON/Georgia/GeorgiaState';
import { map } from 'jquery';


@Injectable({
  providedIn: 'root',
})
export class MapControllerService {
  mainMap: mapboxgl;

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
    this.mainMap.setLayoutProperty(state.toLowerCase()+'-'+planIndex, 'visibility', 'none');
  }

  mapExists(state: string, planIndex: number) {
    if(this.mainMap.getStyle().layers.filter(element => 
      {return element.id.includes(state.toLowerCase()+'-'+planIndex)}).length != 0) {
        return true;
    }
    return false;
  }

  showExistingMap(state:string, planIndex: number) {
    this.mainMap.setLayoutProperty(state.toLowerCase()+'-'+planIndex, 'visibility', 'visible');
  }

  showDistrictMap(state: string, planIndex: number) {
    if(this.mapExists(state, planIndex)) {
      this.showExistingMap(state, planIndex);
      return;
    }
    
    fetch('https://hitboxes.github.io/'+state.toLowerCase()+'-'+planIndex+'.geojson')
    .then(result => result.json())
    .then(data => {
      this.mainMap.addSource(state.toLowerCase()+'-'+planIndex, {
        type: "geojson",
        data: data,
        generateId: true
      });

      let fillArray = ['match', ['get', 'District']];

      data.features.forEach(feature => {
        fillArray.push(feature.properties.District);
        fillArray.push(this.randomColor());
        // console.log(feature);
      });
      fillArray.push("transparent");
      this.mainMap.addLayer({
          id: state.toLowerCase()+"-"+planIndex,
          type: 'fill',
          source: state.toLowerCase()+'-'+planIndex,
          paint: {
            'fill-color': fillArray,
            'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false],
              0.8,
              0.5
              ]
          }
      });
      this.mainMap.once('sourcedata', () => {
        // create hover and opacity here
        var hoveredDistrictID = null;
        this.mainMap.on('mousemove', state.toLowerCase()+'-'+planIndex, (e) => {
          // console.log(e.features[0].properties.District);
          // console.log(e.features[0])
          if(hoveredDistrictID !== null) {
            this.mainMap.setFeatureState(
              { source : state.toLowerCase()+'-'+planIndex, id: hoveredDistrictID },
              { hover : false }
            )
          }
          this.mainMap.setFeatureState(
            { source:  state.toLowerCase()+'-'+planIndex, id: e.features[0].id},
            { hover: true }
          )
          hoveredDistrictID = e.features[0].id
        }
        )
        this.mainMap.on('mouseleave', state.toLowerCase()+'-'+planIndex, () => {
          this.mainMap.setFeatureState(
            { source: state.toLowerCase()+'-'+planIndex, id: hoveredDistrictID },
            { hover: false }
          )
        })  
      })     
    })
    .catch(e => console.log(e));
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

  randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
