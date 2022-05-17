import { Component, OnDestroy, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { DataControllerService } from 'src/app/services/data-controller.service';


@Component({
  selector: 'app-compare-dialog',
  templateUrl: './compare-dialog.component.html',
  styleUrls: ['./compare-dialog.component.css']
})
export class CompareDialogComponent implements OnInit, OnDestroy {
  compareStatus = false;
  map: mapboxgl;
  centers = {
    Mississippi: [-83, 32],
    Georgia: [-77, 32],
    Florida: [-77, 28]
  };


  constructor(public controller: DataControllerService) { }

  ngOnInit(): void {
    console.log("hello");
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZ2drc3duZHVkMTIiLCJhIjoiY2wxdGxmeGp4MGRldzNqbnQwaDExdXZiNCJ9.2ZpdsgA1VbT8KKxe1ENl-A';

    this.map = new mapboxgl.Map({
      container: 'compare-map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: this.centers[this.controller.getSelectedState()],
      zoom: 4.5,
    });

    this.map.resize();
  }


  ngOnDestroy(): void {
    this.map.remove();
  }

  compare() {
    this.compareStatus = true;
  }

  goBack() {
    this.compareStatus = false;
  }

  close() {
    this.compareStatus = false;
  }


  fetchDistrictMap(state: string, planName: string) {
    fetch('https://hitboxes.github.io/'+state.toLowerCase()+'-'+planName+'.geojson')
    .then(result => result.json())
    .then(data => {

    })
    .catch(e => console.log(e));
    }
}
