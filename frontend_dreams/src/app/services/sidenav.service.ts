import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private mainSidenav: MatDrawer;

  constructor() { }

  public setMainSidenav(sidenav: MatDrawer) {
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
