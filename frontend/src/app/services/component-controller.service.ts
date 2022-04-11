import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTabGroup } from '@angular/material/tabs';

@Injectable({
  providedIn: 'root'
})
export class ComponentControllerService {

  private sidenav: MatDrawer;
  private mainTab: MatTabGroup;

  constructor() { }

  ///////////////////////////////////////////////////////////////////////////////////////////
  // Sidenav functions
  public setSidenav(sidenav: MatDrawer) {
    this.sidenav = sidenav;
  }

  public openSidenav() {
    return this.sidenav.open();
  }

  public closeSidenav() {
    return this.sidenav.close();
  }

  public sidenavOpened() {
    return this.sidenav.opened;
  }
  ///////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////
  // Tab functions
  public setTabs(tab: MatTabGroup) {
    this.mainTab = tab;
  }

  public openFirstTab() {
    this.mainTab.selectedIndex = 0;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////
}
