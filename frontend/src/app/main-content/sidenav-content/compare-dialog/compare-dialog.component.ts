import { Component, OnDestroy, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { DataControllerService } from 'src/app/services/data-controller.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-compare-dialog',
  templateUrl: './compare-dialog.component.html',
  styleUrls: ['./compare-dialog.component.css'],
})
export class CompareDialogComponent implements OnInit, OnDestroy {
  compareStatus = false;
  map1: mapboxgl;
  map1selected: string = "";
  map1data: any;
  map2: mapboxgl;
  map2selected: string = "";
  map2data: any;
  centers = {
    Mississippi: [-90, 32.7],
    Georgia: [-83, 32.7],
    Florida: [-83, 28],
  };

  constructor(public controller: DataControllerService) {}

  ngOnInit(): void {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZ2drc3duZHVkMTIiLCJhIjoiY2wxdGxmeGp4MGRldzNqbnQwaDExdXZiNCJ9.2ZpdsgA1VbT8KKxe1ENl-A';

    this.map1 = new mapboxgl.Map({
      container: 'map1',
      style: 'mapbox://styles/mapbox/light-v10',
      center: this.centers[this.controller.getSelectedState()],
      zoom: 5.0,
      interactive: false,
    });

    this.map2 = new mapboxgl.Map({
      container: 'map2',
      style: 'mapbox://styles/mapbox/light-v10',
      center: this.centers[this.controller.getSelectedState()],
      zoom: 5.0,
      interactive: false,
    });
    this.map1data = this.controller.getPlansData()[0];
    if(this.controller.getPlansData().length == 1) {
      this.map2data = this.controller.getPlansData()[0];
    }
    else {
      this.map2data = this.controller.getPlansData()[1];
    }
    this.map1.on('load', () => {
      this.addAll(this.map1);
      this.showExistingMap(this.map1, this.controller.getSelectedState(), this.controller.getPlansData()[0].planName);
      this.map1selected = this.controller.getPlansData()[0].planName;
    });
    this.map2.on('load', () => {
      this.addAll(this.map2);
      if(this.controller.getPlansData().length == 1) {
        this.showExistingMap(this.map2, this.controller.getSelectedState(), this.controller.getPlansData()[0].planName);
        this.map2selected = this.controller.getPlansData()[0].planName;
        this.map2data = this.controller.getPlansData()[0];
      }
      else {
        this.showExistingMap(this.map2, this.controller.getSelectedState(), this.controller.getPlansData()[1].planName);
        this.map2selected = this.controller.getPlansData()[1].planName;
        this.map2data = this.controller.getPlansData()[1];
      }
    });
    return;
  }

  ngOnDestroy(): void {
    this.map1.remove();
    this.map2.remove();
  }


  addAll(map) {
    for (let i = 0; i < this.controller.getPlansData().length; i++) {
      let state = this.controller.getSelectedState().toLowerCase();
      let planName = this.controller.getPlansData()[i].planName;
      map.addSource(state + '-' + planName, {
        type: 'geojson',
        data:
          'https://hitboxes.github.io/' +
          state.toLowerCase() +
          '-' +
          planName +
          '.geojson',
        generateId: true,
      });
      map.addLayer({
        id: state.toLowerCase() + '-' + planName,
        type: 'fill',
        source: state.toLowerCase() + '-' + planName,
        paint: {
          'fill-color': (map == this.map1 ?  '#FFFFE0' : '#90EE90'),
          'fill-opacity': 0.8,
        },
      });
      map.addLayer({
        id: state.toLowerCase() + '-' + planName + '-borders',
        type: 'line',
        source: state.toLowerCase() + '-' + planName,
        paint: {
          'line-color': 'gray',
          'line-width': 1,
        },
      });

      this.hideExistingMap(map, state, planName);
    }
  }

  hideExistingMap(map, state, planName) {
    let layers = map.getStyle().layers.filter(element => { return element.id.includes(state.toLowerCase()+'-'+planName)});
      for(let i = 0; i < layers.length; i++) {
        map.setLayoutProperty(layers[i].id, 'visibility', 'none');
    }
  }

  showExistingMap(map, state, planName) {
    let layers = map.getStyle().layers.filter(element => { return element.id.includes(state.toLowerCase()+'-'+planName)});
    for(let i = 0; i < layers.length; i++) {
      map.setLayoutProperty(layers[i].id, 'visibility', 'visible');
    }
  }

  selectMap1(planName) {
    this.hideExistingMap(this.map1, this.controller.getSelectedState(), this.map1selected);
    this.map1selected = planName;
    this.map1data = this.controller.getPlanDataByName(planName);
    this.showExistingMap(this.map1, this.controller.getSelectedState(), this.map1selected);
  }
  selectMap2(planName) {
    this.hideExistingMap(this.map2, this.controller.getSelectedState(), this.map2selected);
    this.map2selected = planName;
    this.map2data = this.controller.getPlanDataByName(planName);
    this.showExistingMap(this.map2, this.controller.getSelectedState(), this.map2selected);
  }
}
