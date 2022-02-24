import { Injectable } from '@angular/core';
import mapboxgl from 'mapbox-gl';

// import mississippi2 from '../main/mississippi_temp';
// import georgia2 from '../main/georgia_temp';
import mississippi from '../main/mississippiDistrict';
import georgia from '../main/georgiaDistrict';

@Injectable({
  providedIn: 'root'
})
export class MapControlService {
  
  map: mapboxgl;
  centers = {
    "Mississippi": [-85, 32],
    "Georgia": [-79, 32],
    "none": [-100, 40]

  }


  // This is which state layer it is right now
  currentLayer: string;

  // currentMap_id ::: We have to fetch this properly. Probably need another service file that handles the geojson
  // 0 Republican
  // 1 Democratic
  // 2 Other
  currentMap_id: number = 0;


  constructor() { }

  initMap(): void {
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
      'bottom-left'
    );
    this.map.resize();
  }

  // These two methods will be eventually called from each component 
  ////////////////////////////////////////////////////////////////////////////////////////
  changeState(state: string) {
    
    this.removeCurrentMap();
    this.changeCurrentLayer(state);
    this.addSource(state);
    this.addLayer(state, this.currentMap_id);
    this.flyTo(state);
  }

  changePlan(id: number) {
    if(this.currentMap_id != id) {
      this.currentMap_id = id;
      this.removeCurrentMap();
      this.addSource(this.currentLayer);
      this.addLayer(this.currentLayer, this.currentMap_id);
    }
    this.flyTo(this.currentLayer);
  }
  /////////////////////////////////////////////////////////////////////////////////////////


  // functions below is helper functions to call in 2 of the above functions

  // This will have to change to,,,, 
  // 1. fetch necessary geojson accordingly 
  // 2. accept a state and a status and just call addSource to this.map
  addSource(state: string) {
    switch(state) {
      case "Mississippi":
        this.map.addSource(state, {
           type: 'geojson',
           data: mississippi,
        });
        break;
      case "Georgia":
        this.map.addSource(state, {
          type: 'geojson',
          data: georgia,
      });
        break;
      case "none":
      default:
        break;
    }
  }

  //
  addLayer(state: string, id: number) {
    switch(state) {
      case "Mississippi":
        this.map.addLayer({
          id: state,
          type: 'fill',
          source: state,
          paint:{
            'fill-color': ['match', ['get', 'District'], // get the property
                           id == 0 ? 1 : 4 , 'blue',             
                           id == 0 ? 2 : 1 , 'red',
                           id == 0 ? 3 : 2 , 'green',
                           id == 0 ? 4 : 3, 'yellow',            
                           'white']                     
            ,
            'fill-opacity': 0.4,
            'fill-outline-color': 'white'
          },
          filter: ['==', '$type', 'Polygon'],
        });
        break;
      case "Georgia":
        this.map.addLayer({
                id: state,
                type: 'fill',
                source: state,
                paint: {
                  'fill-color': ['match', ['get', 'District'], // get the property
                                 id == 0 ? "001" : "014", 'blue',             
                                 id == 0 ? "002" : "013", 'red',
                                 id == 0 ? "003" : "012", 'green',
                                 id == 0 ? "004" : "011", 'yellow',
                                 id == 0 ? "005" : "010", 'orange', 
                                 id == 0 ? "006" : "009", 'brown', 
                                 id == 0 ? "007" : "008", 'purple', 
                                 id == 0 ? "008" : "007", 'sky blue', 
                                 id == 0 ? "009" : "006", 'crimson', 
                                 id == 0 ? "010" : "005", 'wheat', 
                                 id == 0 ? "011" : "004", 'cyan', 
                                 id == 0 ? "012" : "003", 'lime', 
                                 id == 0 ? "013" : "002", 'salmon',
                                 id == 0 ? "014" : "001", 'teal',         
                                 'white']                     
                  ,
                  'fill-opacity': 0.4,
                  'fill-outline-color': 'white'
                },
                filter: ['==', '$type', 'Polygon'],
              });
        break;
      case "none":
      default: break;
    }
  }


  flyTo(state: string) {
    switch(state) {
      case "Mississippi":
        this.map.flyTo({
          // These options control the ending camera position: centered at
          // the target, at zoom level 9, and north up.
          center: this.centers[state],
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
        
      case "Georgia":
        this.map.flyTo({
          // These options control the ending camera position: centered at
          // the target, at zoom level 9, and north up.
          center: this.centers[state],
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
      case "none":
        this.map.flyTo({
          // These options control the ending camera position: centered at
          // the target, at zoom level 9, and north up.
          center: this.centers[state],
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
      default:
        break;
    }
  }



  changeCurrentLayer(state: string) {
    this.currentLayer = state;
  }


  removeCurrentMap() {
    if(this.currentLayer && this.currentLayer != "Select a state" && this.currentLayer != "none") {
      this.map.removeLayer(this.currentLayer);
      this.map.removeSource(this.currentLayer);
    }
  }

  getMap() {
    return this.map;
  }

  getCenter() {
    return this.map.center;
  }

  getCenterList() {
    return this.centers;
  }

  returnTo() {
      this.flyTo(this.currentLayer);
  }
}
