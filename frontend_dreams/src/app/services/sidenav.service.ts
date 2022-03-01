import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private mainSidenav: MatDrawer;
  private districtSidenav: MatDrawer;

  constructor() { }

  public setMainSidenav(sidenav: MatDrawer) {
    this.mainSidenav = sidenav;
  }

  public openMain() {
    return this.mainSidenav.open();
  }

  public closeMain() {
    return this.mainSidenav.close();
  }

  public toggleMain() {
    return this.mainSidenav.toggle();
  }



  //////////////////////////////////////////////////////////
  public setDistrictSidenav(sidenav: MatDrawer) {
    this.districtSidenav = sidenav;
  }

  public openDistrict() {
    return this.districtSidenav.open();
  }

  public closeDistrict() {
    return this.districtSidenav.close();
  }

  public toggleDistrict() {
    return this.districtSidenav.toggle();
  }

}
