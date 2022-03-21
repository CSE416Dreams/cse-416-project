import { Injectable } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { async } from 'rxjs';

// Temporary Datas import
import georgiaCounty from '../main-content/map/TempData/georgiaCountyMap';
import mississippiCountyMap from '../main-content/map/TempData/mississippiCountyMap';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  mainMap: mapboxgl;
  centers = {
    None: [-100, 40],
    Mississippi: [-84.5, 32],
    Georgia: [-78, 32],
  };

  searchedPlan = [];

  constructor() {}



  initMainMap() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZ2drc3duZHVkMTIiLCJhIjoiY2t6eGNyYzkyMDA4MDJucXYzMXl6ZWRndyJ9.kvBVb9k31YIndDvMmfIhYQ';

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
  //////////////////////////////////////////////////////////////
  getMainMap() {
    return this.mainMap;
  }

  validateCenter(state: string) {
    if(this.mainMap.getCenter().lng != this.centers[state][0] || this.mainMap.getCenter().lat != this.centers[state][1]) {
      return false;
    }
    else return true;
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

  async showMap(state: string, id: number) {
    // This is properly called
    let index = this.searchPlan(state, id);

    if(index != -1) {
      // already in searched

      return;
    }
    // If none is selected, two geojson combined (for miss and georgia )
    // Fetch proper GEOJSON OR ALL DATA for the map here and put it in the data section below
    else {
      await myFetch(state, id).then(json => {
        let plan = {
          state: state,
          id: id,
          data: json.geoJSONMap
        }
        if(this.searchPlan(state,id) == -1) {
          this.searchedPlan.push(plan);

          this.addSource(plan.state, plan.id);
          this.addLayer(plan.state, plan.id);
        }
        // this.addLayer(plan.state, plan.id)
      })
      .catch(e => console.log(e));
    }
  }

  addSource(state: string, id: number) {
    this.mainMap.addSource(state+"-"+id, {
                      type: 'geojson',
                      data: JSON.parse(this.searchedPlan[this.searchPlan(state, id)].data)
                    });
  }

  addLayer(state: string, id: number) {
    this.mainMap.addLayer({
                  id: state+"-"+id,
                  type: 'fill',
                  source: state+"-"+id,
                  paint: {
                    // 'fill-color': ['match', ['get', 'District'], // get the property
                    //                 id == 0 ? "001" : "014", 'blue',
                    //                 id == 0 ? "002" : "013", 'red',
                    //                 id == 0 ? "003" : "012", 'green',
                    //                 id == 0 ? "004" : "011", 'yellow',
                    //                 id == 0 ? "005" : "010", 'orange',
                    //                 id == 0 ? "006" : "009", 'brown',
                    //                 id == 0 ? "007" : "008", 'purple',
                    //                 id == 0 ? "008" : "007", 'sky blue',
                    //                 id == 0 ? "009" : "006", 'crimson',
                    //                 id == 0 ? "010" : "005", 'wheat',
                    //                 id == 0 ? "011" : "004", 'cyan',
                    //                 id == 0 ? "012" : "003", 'lime',
                    //                 id == 0 ? "013" : "002", 'salmon',
                    //                 id == 0 ? "014" : "001", 'teal',
                    //                 'white']
                    // ,
                    'fill-opacity': 0.4,
                    'fill-outline-color': 'white'
                  },
                    filter: ['==', '$type', 'Polygon'],
                  });
  }

  removeMap(state: string, id: number) {

  }


  searchPlan(state: string, id: number) {
    for(let i = 0; i < this.searchedPlan.length; i++) {
      if(this.searchedPlan[i].state == state && this.searchedPlan[i].id == id) {
        return i;
      }
    }
    return -1;
  }
}



async function myFetch(state, id) {
  let response = await fetch('http://localhost:8080/server/webapi/maps/'+state);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}



















// These functions below will be called from StateService
/////////////////////////////////////////////////////////////////////////////////////////////////////


  // async moveTo(state: string, id: number) {
  //   // addLayer - id checking
  //   // addSource - id checking
  //   // FlyTo
  //   // console.log("t1");
  //   // this.removeCurrentMap();
  //   // console.log("t2");
  //   // this.changeCurrentLayer(state);
  //   // console.log("t3");
  //   // await this.addSource(state, 0);
  //   // console.log("t4");
  //   // this.addLayer(state, this.currentMap_id);
  //   // console.log("t5");
  //   this.flyTo(state);
  //   // console.log("t6");
  // }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// changeCurrentLayer(state: string) {
//   this.currentLayer = state;
// }
//   addLayer(state: string, id: number) {
//     switch(state) {
//       case "Mississippi":
//         if(id == 0 || id == 1) {
//           console.log(state);
//           //for each district plan district number, make an array of counties in that district. if there are n districts, there will be an array of n arrays
//           console.log(this.mainMap);
//           this.mainMap.addLayer({
//             id: state,
//             type: 'fill',
//             source: state,
//             paint:{
//               'fill-color': ['match', ['get', 'District'], // get the property
//                             id == 0 ? 1 : 4 , 'blue',
//                             id == 0 ? 2 : 1 , 'red',
//                             id == 0 ? 3 : 2 , 'green',
//                             id == 0 ? 4 : 3, 'yellow',
//                             'green']
//               ,
//               'fill-opacity': 0.4,
//               'fill-outline-color': 'white'
//             },
//             filter: ['==', '$type', 'Polygon'],
//           });
//           // Create a popup, but don't add it to the map yet.
//           console.log(this.mainMap)
//         }
//         else {
//           this.mainMap.addLayer({
//             id: state,
//             type: 'fill',
//             source: state,
//             paint:{
//               'fill-opacity': 0.4,
//               'fill-outline-color': 'white'
//             },
//             filter: ['==', '$type', 'Polygon'],
//           });
//         }
//         break;
//       case "Georgia":
//         if(id == 0 || id == 1) {
//           this.mainMap.addLayer({
//             id: state,
//             type: 'fill',
//             source: state,
//             paint: {
//               'fill-color': ['match', ['get', 'District'], // get the property
//                               id == 0 ? "001" : "014", 'blue',
//                               id == 0 ? "002" : "013", 'red',
//                               id == 0 ? "003" : "012", 'green',
//                               id == 0 ? "004" : "011", 'yellow',
//                               id == 0 ? "005" : "010", 'orange',
//                               id == 0 ? "006" : "009", 'brown',
//                               id == 0 ? "007" : "008", 'purple',
//                               id == 0 ? "008" : "007", 'sky blue',
//                               id == 0 ? "009" : "006", 'crimson',
//                               id == 0 ? "010" : "005", 'wheat',
//                               id == 0 ? "011" : "004", 'cyan',
//                               id == 0 ? "012" : "003", 'lime',
//                               id == 0 ? "013" : "002", 'salmon',
//                               id == 0 ? "014" : "001", 'teal',
//                               'white']
//               ,
//               'fill-opacity': 0.4,
//               'fill-outline-color': 'white'
//             },
//               filter: ['==', '$type', 'Polygon'],
//             });
//           }
//           else {
//             this.mainMap.addLayer({
//               id: state,
//               type: 'fill',
//               source: state,
//               paint:{
//                 'fill-opacity': 0.4,
//                 'fill-outline-color': 'white'
//               },
//               filter: ['==', '$type', 'Polygon'],
//             });
//           }
//           break;
//       case "none":
//       default: break;
//     }
//   }
  // async addSource(state: string, ID: number) {
  //   switch(state) {
  //     case "Mississippi":
  //             let mississippiCounty = await myFetch('Mississippi');
  //             myFetch('Mississippi').then(json => {
  //                 mississippiCounty = json;
  //             })
  //             .catch(e => console.log(e));

  //             console.log(mississippiCounty.geoJSONMap);
  //             if(ID == 0) {
  //               this.mainMap.addSource(state, {
  //                 type: 'geojson',
  //                 data: mississippiCounty.geoJSONMap,
  //               });
  //               console.log("0");
  //             }
  //             else if(ID == 1) {
  //               this.mainMap.addSource(state, {
  //                 type: 'geojson',
  //                 data: mississippiCounty.geoJSONMap,
  //               });
  //               console.log("1");
  //             }
  //             else {
  //               this.mainMap.addSource(state, {
  //                 type: 'geojson',
  //                 data: mississippiCounty.geoJSONMap,
  //               });
  //               console.log("2");
  //             }

  //       break;
  //     case "Georgia":
  //       // if(ID == 0) {
  //       //   this.mainMap.addSource(state, {
  //       //     type: 'geojson',
  //       //     data: georgiaMain,
  //       //   });
  //       // }
  //       // else if(ID == 1) {
  //       //   this.mainMap.addSource(state, {
  //       //     type: 'geojson',
  //       //     data: georgiaDemo,
  //       //   });
  //       // }
  //       // else {
  //       //   this.mainMap.addSource(state, {
  //       //     type: 'geojson',
  //       //     data: georgiaCounty,
  //       //   });
  //       // }
  //       break;
  //     case "none":
  //     default:
  //       break;
  //   }
  // }




  // async fetchText() {
  //   let response = await fetch('http://localhost:8080/server/webapi/maps/Mississippi',  );

  //   console.log("f")
  //   console.log(response.status); // 200
  //   console.log(response.statusText); // OK

  //   if (response.status === 200) {
  //       let data = await response.text();
  //       console.log(data)
  //       return JSON.parse(data);
  //       // handle data
  //   }

  // }




