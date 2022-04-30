import { Injectable } from '@angular/core';
import mapboxgl from 'mapbox-gl';

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
    return;
  }

  validateCenter(state: string) {
    if (
      Math.round(this.mainMap.getCenter().lng) != this.centers[state][0] ||
      Math.round(this.mainMap.getCenter().lat) != this.centers[state][1]
    ) {
      return false;
    } else return true;
  }

  hideCurrentMap(state: string, planName: string) {
    let layers = this.mainMap.getStyle().layers.filter(element => { return element.id.includes(state.toLowerCase()+'-'+planName)});
    for(let i = 0; i < layers.length; i++) {
      this.mainMap.setLayoutProperty(layers[i].id, 'visibility', 'none');
    }
    return;
  }

  mapExists(state: string, planName: string) {
    if(this.mainMap.getStyle().layers.filter(element =>
      { return element.id.includes(state.toLowerCase()+'-'+planName)}).length != 0) {
        return true;
    }
    return false;
  }

  showExistingMap(state:string, planName: string) {
    let layers = this.mainMap.getStyle().layers.filter(element => { return element.id.includes(state.toLowerCase()+'-'+planName)});
    for(let i = 0; i < layers.length; i++) {
      this.mainMap.setLayoutProperty(layers[i].id, 'visibility', 'visible');
    }
    return;
  }

  showDistrictMap(state: string, planName: string) {
    if(this.mapExists(state, planName)) {
      this.showExistingMap(state, planName);
      return;
    }
    if(planName == "Counties") {
      this.fetchCounties(state);
    }
    else if(planName == "Precincts") {
      this.fetchPrecincts(state);
    }
    else {
      this.fetchDistrictMap(state, planName);
    }
    return;
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
    return;
  }

  fetchCounties(state: string) {
    fetch('https://hitboxes.github.io/'+state.toLowerCase()+'-Counties.geojson')
    .then(result => result.json())
    .then(data => {
      this.mainMap.addSource(state.toLowerCase()+'-Counties', {
        type: "geojson",
        data: data,
        generateId: true
      });
      this.mainMap.addLayer({
          id: state.toLowerCase()+'-Counties',
          type: 'fill',
          source: state.toLowerCase()+'-Counties',
          paint: {
            'fill-color': "black",
            'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false],
              0.85,
              0.3
              ]
          }
      });
      this.mainMap.addLayer({
        id: state.toLowerCase()+"-Counties-borders",
        type: 'line',
        source: state.toLowerCase()+'-Counties',
        paint: {
          'line-color': "gray",
          'line-width' : 1
        }
      })
      this.mainMap.once('sourcedata', () => {
        var hoveredDistrictID = null;
        var popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        })
        this.mainMap.on('mousemove', state.toLowerCase()+'-Counties', (e) => {
          if(hoveredDistrictID !== null) {
            this.mainMap.setFeatureState(
              { source : state.toLowerCase()+'-Counties', id: hoveredDistrictID },
              { hover : false }
            )
            ////////////////
            var description = e.features[0].properties.NAME;
            var coordinate = e.lngLat;
            coordinate.lat = coordinate.lat + 0.15;
            popup.setLngLat(coordinate).setHTML(description).addTo(this.mainMap);
            ////////////////
          }
          this.mainMap.setFeatureState(
            { source:  state.toLowerCase()+'-Counties', id: e.features[0].id},
            { hover: true }
          )
          hoveredDistrictID = e.features[0].id
        })
        this.mainMap.on('mouseleave', state.toLowerCase()+'-Counties', () => {
          this.mainMap.setFeatureState(
            { source: state.toLowerCase()+'-Counties', id: hoveredDistrictID },
            { hover: false }
          )
          popup.remove();
        })
      })
    })
    .catch(e => console.log(e));
  }

  fetchPrecincts(state: string) {
    fetch('https://hitboxes.github.io/'+state.toLowerCase()+'-Precincts.geojson')
    .then(result => result.json())
    .then(data => {
      this.mainMap.addSource(state.toLowerCase()+'-Precincts', {
        type: "geojson",
        data: data,
        generateId: true
      });

      let fillArray = ['match', ['get', 'GEOID']];

      data.features.forEach(feature => {
        fillArray.push(feature.properties.GEOID);
        fillArray.push(this.randomColor());
      });
      fillArray.push("transparent");

      this.mainMap.addLayer({
          id: state.toLowerCase()+'-Precincts',
          type: 'fill',
          source: state.toLowerCase()+'-Precincts',
          paint: {
            'fill-color': fillArray,
            'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false],
              0.85,
              0.3
              ]
          }
      });
      this.mainMap.addLayer({
        id: state.toLowerCase()+"-Precincts-borders",
        type: 'line',
        source: state.toLowerCase()+'-Precincts',
        paint: {
          'line-color': "gray",
          'line-width' : 1
        }
      })
      this.mainMap.once('sourcedata', () => {
        var hoveredDistrictID = null;
        var popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        })
        this.mainMap.on('mousemove', state.toLowerCase()+'-Precincts', (e) => {
          if(hoveredDistrictID !== null) {
            this.mainMap.setFeatureState(
              { source : state.toLowerCase()+'-Precincts', id: hoveredDistrictID },
              { hover : false }
            )
            ////////////////
            var description = e.features[0].properties.GEOID;
            var coordinate = e.lngLat;
            coordinate.lat = coordinate.lat + 0.15;
            popup.setLngLat(coordinate).setHTML(description).addTo(this.mainMap);
            ////////////////
          }
          this.mainMap.setFeatureState(
            { source:  state.toLowerCase()+'-Precincts', id: e.features[0].id},
            { hover: true }
          )
          hoveredDistrictID = e.features[0].id
        })
        this.mainMap.on('mouseleave', state.toLowerCase()+'-Precincts', () => {
          this.mainMap.setFeatureState(
            { source: state.toLowerCase()+'-Precincts', id: hoveredDistrictID },
            { hover: false }
          )
          popup.remove();
        })
      })
    })
    .catch(e => console.log(e));
  }

  fetchDistrictMap(state: string, planName: string) {
    fetch('https://hitboxes.github.io/'+state.toLowerCase()+'-'+planName+'.geojson')
    .then(result => result.json())
    .then(data => {
      this.mainMap.addSource(state.toLowerCase()+'-'+planName, {
        type: "geojson",
        data: data,
        generateId: true
      });

      let fillArray = ['match', ['get', 'District']];

      data.features.forEach(feature => {
        fillArray.push(feature.properties.District);
        fillArray.push(this.randomColor());
      });
      fillArray.push("transparent");
      this.mainMap.addLayer({
          id: state.toLowerCase()+"-"+planName,
          type: 'fill',
          source: state.toLowerCase()+'-'+planName,
          paint: {
            'fill-color': fillArray,
            'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false],
              0.95,
              0.2
              ]
          }
      });
      this.mainMap.addLayer({
        id: state.toLowerCase()+"-"+planName+"-borders",
        type: 'line',
        source: state.toLowerCase()+'-'+planName,
        paint: {
          'line-color': "gray",
          'line-width' : 1
        }
      })
      this.mainMap.once('sourcedata', () => {
        var hoveredDistrictID = null;
        this.mainMap.on('mousemove', state.toLowerCase()+'-'+planName, (e) => {
          if(hoveredDistrictID !== null) {
            this.mainMap.setFeatureState(
              { source : state.toLowerCase()+'-'+planName, id: hoveredDistrictID },
              { hover : false }
            )
          }
          this.mainMap.setFeatureState(
            { source:  state.toLowerCase()+'-'+planName, id: e.features[0].id},
            { hover: true }
          )
          hoveredDistrictID = e.features[0].id
        })
        this.mainMap.on('mouseleave', state.toLowerCase()+'-'+planName, () => {
          this.mainMap.setFeatureState(
            { source: state.toLowerCase()+'-'+planName, id: hoveredDistrictID },
            { hover: false }
          )
        })
      })
    })
    .catch(e => console.log(e));
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
  resetToInitial(state: string) {
    this.mainMap.setLayoutProperty(state.toLowerCase(), 'visibility', 'visible');
    return;
  }

  hideStateMap(state: string) {
    this.mainMap.setLayoutProperty(state.toLowerCase(), 'visibility', 'none');
    return;
  }

  initialMap() {
    this.initialFlorida();
    this.initialGeorgia();
    this.initialMississippi();
    return;
  }

  initialFlorida() {
    fetch('https://hitboxes.github.io/florida-State.geojson')
    .then(result => result.json())
    .then(data => {
      this.mainMap.addSource('florida', {
        type: 'geojson',
        data: data,
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
    })
    return;
  }

  initialMississippi() {
    fetch('https://hitboxes.github.io/mississippi-State.geojson')
    .then(result => result.json())
    .then(data => {
      this.mainMap.addSource('mississippi', {
        type: 'geojson',
        data: data,
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
    })
    return;
  }

  initialGeorgia() {
    fetch('https://hitboxes.github.io/georgia-State.geojson')
    .then(result => result.json())
    .then(data => {
      this.mainMap.addSource('georgia', {
        type: 'geojson',
        data: data,
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
    })
    return;
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
    return;
  }
}
