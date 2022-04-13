import { Injectable } from '@angular/core';
import mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapControllerService {
  mainMap: mapboxgl;
  // comparing maps will be locked hopefully

  centers = {
    None: [-100, 40],
    Mississippi: [-84.5, 32],
    Georgia: [-78, 32],
    Florida: [-77.5, 27]
  };

  constructor() { }

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
  }

  validateCenter(state: string) {
    if(this.mainMap.getCenter().lng != this.centers[state][0] || this.mainMap.getCenter().lat != this.centers[state][1]) {
      return false;
    }
    else return true;
  }

  initialMap() {
    // This will be when hover enabled in the US map to be able to click each states!

    /*
    1. remove current layers, if any
    2. add the source for state outlines for all 3 states
    3. add layer for all 3 states
    4. make hover / click functions
    */
  }

  showDistrictPlan(state: string, planIndex: number) {
    // if index is 0, it will use the
  // This will be when a state or district plan is selected

    /*
    1. remove current layers, if any (for that state)  * leave the other states outline map
    2. add the source for the selected plan
    3. add layer for that state
    4. make hover for each district / county
    */
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
}


async function fetchMap(state: string, planIndex:number) {
  let response = await fetch("");  // Need to fill this out
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}
