import { Injectable } from '@angular/core';
import { ComponentControllerService } from './component-controller.service';
import { MapControllerService } from './map-controller.service';

@Injectable({
  providedIn: 'root'
})
export class DataControllerService {

  selectedState: string = "None";
  selectedPlan: string = "Summary";
  selectedDistrict: number = 1;
  currentMap: string = "None"; // format = {state(lowercase)}-{planName}

  stateData = undefined;
  plansData = [];


  seawulfSVData = undefined; // this is the data we are going to use
  seatVoteDatas = [];
  boxAndWhiskerData = [];
  seawulfHistData = [];

  constructor(
    public mapController: MapControllerService,
    public componentController: ComponentControllerService
  ) { }

  isReady() {
    if(this.stateData == undefined) {
      return false;
    }
    return true;
  }

  getSelectedState() {
    return this.selectedState;
  }

  getIndexOfPlan(planName) {
    for(let i = 0; i < this.plansData.length; i++) {
      if(this.plansData[i].planName == planName) {
        return i;
      }
    }
    return -1;
  }

  getSelectedPlan() {
    return this.selectedPlan;
  }

  getSelectedDistrict() {
    return this.selectedDistrict;
  }

  getIndexOfState() {
    if(this.selectedState == "Florida") return 0;
    else if(this.selectedState == "Georgia") return 2;
    else if(this.selectedState == "Mississippi") return 1;
    else return -1;
  }

  getCurrentMap() {
    return this.currentMap;
  }

  getPlanData(index: number) {
    return this.plansData[index];
  }

  getHistogramData() {
    return this.seawulfHistData;
  }

  getBoxAndWhiskerData() {
    return this.boxAndWhiskerData;
  }

  getPlanDataByName(name : string) {
    for(let i = 0; i < this.plansData.length; i++) {
      if(this.plansData[i].planName == name) {
        return this.plansData[i];
      }
    }
    return undefined;
  }

  getCurrentPlanData() {
    return this.plansData.find(plan => plan.planName == this.selectedPlan);
  }

  getCurrentDistrictData() {
    return this.getCurrentPlanData().districts[this.selectedDistrict-1];
  }

  getPlansData() {
    return this.plansData;
  }

  getRepDemSplit(plan: any) {
    let result = [];
    for(let i = 0; i < plan.repDemSplit[1]; i++) {
      result.push("blue");
    }
    for(let i = 0; i < plan.repDemSplit[0]; i++) {
      result.push("red");
    }

    return result;
  }

  getCurrentSVCurve() {
    return this.seatVoteDatas[this.selectedPlan];
  }

  getCurrentSeawulfSVCurve() {
    return this.seawulfSVData;
  }


  clearData() {
    this.stateData = undefined;
    this.boxAndWhiskerData = [];
    this.plansData = [];
    this.seatVoteDatas = [];
    this.seawulfHistData = [];
    this.selectedDistrict = 1;
    this.seawulfSVData = undefined;
    this.selectedPlan = "Summary"
    return;
  }



  resetShows() {
    return;
  }

  changeDistrict(number: number) {
    this.selectedDistrict = number;
    return;
  }

  async changeState(string: string) {
    let oldState = this.selectedState;
    this.selectedState = string;
    this.mapController.flyTo(this.selectedState);
    this.resetShows();
    if(string == oldState) {
      return;
    }
    // Case : Going back to None
    if(string == "None" && oldState != "None") {
      this.clearData();
      this.mapController.hideCurrentMap(oldState, this.currentMap);
      this.mapController.removeFilter(oldState, this.currentMap);
      this.currentMap = "None";
      this.mapController.resetToInitial(oldState);
      this.componentController.closeSidenav();
      return;
    }

    // // Case : State to State, None to State
    this.clearData();
    this.componentController.openSidenav();
    this.mapController.hideStateMap(this.selectedState);
    if(oldState != "None") {
      this.mapController.hideCurrentMap(oldState, this.currentMap);
      this.mapController.removeFilter(oldState, this.currentMap);
      this.currentMap = "None";
      this.mapController.resetToInitial(oldState);
    }
    await this.getState();
    await this.getSVCurve();
    await this.getBoxAndWhiskers(this.selectedState);
    await this.getHistograms(this.selectedState);
    await this.getSeawulfSVCurve(this.selectedState);

    console.log(this.boxAndWhiskerData);
    // console.log(this.seawulfSVData);
    this.currentMap = this.plansData[0].planName;
    this.mapController.showDistrictMap(this.selectedState, this.currentMap);
    return;
  }


  changeSelectedPlan(index: number) {
    if(index == 0) {
      if(this.currentMap != this.plansData[0].planName) {
        this.mapController.hideCurrentMap(this.selectedState, this.currentMap);
        this.currentMap = this.plansData[0].planName;
        this.mapController.showDistrictMap(this.selectedState, this.currentMap);
      }
      this.resetShows();
      this.selectedPlan = "Summary";
      return;
    }
    // selecting the same plan
    if(this.selectedPlan == this.plansData[index-1].planName) {
      return;
    }

    this.selectedDistrict = 1;
    this.mapController.hideCurrentMap(this.selectedState, this.currentMap);
    this.selectedPlan = this.plansData[index-1].planName;
    this.currentMap = this.selectedPlan;
    this.mapController.showDistrictMap(this.selectedState, this.currentMap);

    console.log(this.getCurrentPlanData());
    return;
  }

  changeSelectedDistrict(number: number) {
    this.selectedDistrict = number;
    return;
  }

  changeMap(string: string) {
    this.mapController.hideCurrentMap(this.selectedState, this.currentMap);
    this.currentMap = string;
    this.mapController.showDistrictMap(this.selectedState, this.currentMap);
    return;
  }

  initMainMap() {
    this.mapController.initMainMap();
    let stateOptions = ['Mississippi', 'Georgia', 'Florida'];
    for(let i = 0; i < stateOptions.length; i++) {
      this.mapController.getMainMap().on("click", stateOptions[i].toLowerCase(), () => {
        this.changeState(stateOptions[i]);
      })
    }
    return;
  }

  returnTo() {
    this.mapController.flyTo(this.selectedState);
    return;
  }


  async getSVCurve(){
    for(let i = 0; i < this.plansData.length; i++) {
      // console.log(this.plansData[i].planName);
      await fetchSeatVoteData(this.selectedState, this.plansData[i].planName).then(result => {
        result = JSON.parse(result);
        // console.log(result)
        // result[0]['series'] = result[0]['series'].splice(10, 80);
        // result[1]['series'] = result[1]['series'].splice(10, 80);
        this.seatVoteDatas[this.plansData[i].planName] = result;
      }

      );
    }
    // await fetchSeatVoteData(this.selectedState, plan);
    return;
  }

  async getSeawulfSVCurve(state: string) {
    await fetchSeawulfSeatVoteData(state).then(result => {
      result = JSON.parse(result);
      this.seawulfSVData = result;
    })
    .catch(e => console.log(e));
  }

  async getHistograms(state: string) {
    await fetchSeawulfHistMMDData(state).then(result => {
      result = JSON.parse(result);
      this.seawulfHistData.push(result);
    })
    .catch(e => console.log(e));
    await fetchSeawulfHistRepData(state).then(result => {
      result = JSON.parse(result);
      this.seawulfHistData.push(result);
    })
    .catch(e => console.log(e));

    await fetchSeawulfHistDemData(state).then(result => {
      result = JSON.parse(result);
      this.seawulfHistData.push(result);
    })
    .catch(e => console.log(e));

  }

  async getBoxAndWhiskers(state: string) {
    
    await fetchSeawulfBoxAndWhiskerData1(state).then(result => {
      result = JSON.parse(result);
      this.boxAndWhiskerData.push(result);
    })
    .catch(e => console.log(e));
    await fetchSeawulfBoxAndWhiskerData2(state).then(result => {
      result = JSON.parse(result);
      this.boxAndWhiskerData.push(result);
    })
    .catch(e => console.log(e));
    await fetchSeawulfBoxAndWhiskerData3(state).then(result => {
      result = JSON.parse(result);
      this.boxAndWhiskerData.push(result);
    })
    .catch(e => console.log(e));
    await fetchSeawulfBoxAndWhiskerData4(state).then(result => {
      result = JSON.parse(result);
      this.boxAndWhiskerData.push(result);
    })
    .catch(e => console.log(e));
    await fetchSeawulfBoxAndWhiskerData5(state).then(result => {
      result = JSON.parse(result);
      this.boxAndWhiskerData.push(result);
    })
    .catch(e => console.log(e));
    await fetchSeawulfBoxAndWhiskerData6(state).then(result => {
      result = JSON.parse(result);
      this.boxAndWhiskerData.push(result);
    })
    .catch(e => console.log(e));
  }

  

  async getState() {
    await fetchState(this.selectedState)
    .then(result => {
      let jsonObj = JSON.parse(result);
      for(let i = 0; i < jsonObj.dps.length; i++) {
        if(jsonObj.dps[i].planStatus == "Approved" || jsonObj.dps[i].planStatus == "In Litigation") {
          this.plansData.splice(0, 0, jsonObj.dps[i])
        }
        else if(jsonObj.dps[i].planStatus == "Rejected") {
          this.plansData.push(jsonObj.dps[i]);
        }
        else {
          this.plansData.splice(1, 0, jsonObj.dps[i]);
        }
      }
      this.stateData = jsonObj;
    })
    .catch(e => console.log(e));
    return;
  }
}

async function fetchState(selectedState: string) {
  // TODO: this should be fixed in the server-side
  let key = "";
  switch(selectedState) {
    case "Mississippi":
      key = "MS";
      break;
    case "Georgia":
      key = "GA";
      break;
    case "Florida":
      key = "FL";
      break;
  }
  let response = await fetch('http://localhost:8080/server/webapi/states/'+key);
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}

async function fetchSeatVoteData(selectedState: string, selectedPlan: string){
  let response = await fetch('https://hitboxes.github.io/seatVotesCurve/'+selectedState.toLowerCase()+'/vs-' + selectedPlan +'.json');
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return await response.text();
}

async function fetchSeawulfSeatVoteData(selectedState: string){
  let response = await fetch('https://hitboxes.github.io/seatVotesCurve/'+selectedState.toLowerCase()+'/seawulf.json');
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return await response.text();
}

async function fetchSeawulfHistMMDData(selectedState: string){
  let response = await fetch('https://hitboxes.github.io/SeaWulf/sea-'+selectedState.toLowerCase()+'-mm-hist.json');
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return await response.text();
}

async function fetchSeawulfHistRepData(selectedState: string){
  let response = await fetch('https://hitboxes.github.io/SeaWulf/sea-'+selectedState.toLowerCase()+'-rep-hist.json');
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return await response.text();
}

async function fetchSeawulfHistDemData(selectedState: string){
  let response = await fetch('https://hitboxes.github.io/SeaWulf/sea-'+selectedState.toLowerCase()+'-dem-hist.json');
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return await response.text();
}

async function fetchSeawulfBoxAndWhiskerData1(selectedState: string){
  // https://hitboxes.github.io/SeaWulf/sea-georgia-black-bwp.json
  let response = await fetch('https://hitboxes.github.io/SeaWulf/sea-'+selectedState.toLowerCase()+'-white-bwp.json');
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return await response.text();
}

async function fetchSeawulfBoxAndWhiskerData2(selectedState: string){
  // https://hitboxes.github.io/SeaWulf/sea-georgia-black-bwp.json
  let response = await fetch('https://hitboxes.github.io/SeaWulf/sea-'+selectedState.toLowerCase()+'-black-bwp.json');
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return await response.text();
}

async function fetchSeawulfBoxAndWhiskerData3(selectedState: string){
  // https://hitboxes.github.io/SeaWulf/sea-georgia-black-bwp.json
  let response = await fetch('https://hitboxes.github.io/SeaWulf/sea-'+selectedState.toLowerCase()+'-asian-bwp.json');
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return await response.text();
}

async function fetchSeawulfBoxAndWhiskerData4(selectedState: string){
  // https://hitboxes.github.io/SeaWulf/sea-georgia-black-bwp.json
  let response = await fetch('https://hitboxes.github.io/SeaWulf/sea-'+selectedState.toLowerCase()+'-hispanic-bwp.json');
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return await response.text();
}

async function fetchSeawulfBoxAndWhiskerData5(selectedState: string){
  // https://hitboxes.github.io/SeaWulf/sea-georgia-black-bwp.json
  let response = await fetch('https://hitboxes.github.io/SeaWulf/sea-'+selectedState.toLowerCase()+'-rep-bwp.json');
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return await response.text();
}

async function fetchSeawulfBoxAndWhiskerData6(selectedState: string){
  // https://hitboxes.github.io/SeaWulf/sea-georgia-black-bwp.json
  let response = await fetch('https://hitboxes.github.io/SeaWulf/sea-'+selectedState.toLowerCase()+'-dem-bwp.json');
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return await response.text();
}