import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private mainSidenav: MatDrawer;

  constructor() { }

  async setMainSidenav(state: string, sidenav: MatDrawer) {
    if(!localStorage.getItem(state)) {
      // this.addSource(state, id);
      // this.addLayer(state, id);
      // let data = JSON.parse(localStorage.getItem(state+"-"+id));
      // console.log(data);
      await myFetch(state).then(json => {
        let state = (json);
        localStorage.setItem(state, JSON.stringify(state));
        console.log(state);
        // this.addSource(state, id);
        // this.addLayer(state, id);
      })
      .catch(e => console.log(e));
    }
    this.mainSidenav = sidenav;
  }

  public openMain() {
    // this.tabGroups.selectedIndex = 0;
    return this.mainSidenav.open();
  }

  public closeMain() {
    return this.mainSidenav.close();
  }

  public toggleMain() {
    return this.mainSidenav.toggle();
  }



  //////////////////////////////////////////////////////////

}
async function myFetch(state) {
  let response = await fetch('http://localhost:8080/server/webapi/states/mississippi');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

function clearStorage() {
  localStorage.clear();
}
window.addEventListener('load', clearStorage);
