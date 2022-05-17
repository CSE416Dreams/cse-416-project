import { Component, OnInit, ViewChild } from '@angular/core';
import { DataControllerService } from 'src/app/services/data-controller.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
// import {
//   ChartComponent,
//   ApexChart,
//   ApexPlotOptions,
//   ApexTitleSubtitle,
//   ApexAxisChartSeries
// } from "ng-apexcharts";

// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   title: ApexTitleSubtitle;
//   plotOptions: ApexPlotOptions;
// };

@Component({
  selector: 'app-district-plan-content',
  templateUrl: './district-plan-content.component.html',
  styleUrls: ['./district-plan-content.component.css']
})
export class DistrictPlanContentComponent implements OnInit {



  multi: any[];
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#f00', '#00f', '#f0f'],
  };


  constructor(public controller: DataControllerService) {

    // box and whisker
    // this.chartOptions = {
    //   series: [
    //     {
    //       type: "boxPlot",
    //       data: [
    //         {
    //           x: "Jan 2015",
    //           y: [54, 66, 69, 75, 88]
    //         },
    //         {
    //           x: "Jan 2016",
    //           y: [43, 65, 69, 76, 81]
    //         },
    //         {
    //           x: "Jan 2017",
    //           y: [31, 39, 45, 51, 59]
    //         },
    //         {
    //           x: "Jan 2018",
    //           y: [39, 46, 55, 65, 71]
    //         },
    //         {
    //           x: "Jan 2019",
    //           y: [29, 31, 35, 39, 44]
    //         },
    //         {
    //           x: "Jan 2020",
    //           y: [41, 49, 58, 61, 67]
    //         },
    //         {
    //           x: "Jan 2021",
    //           y: [54, 59, 66, 71, 88]
    //         }
    //       ]
    //     }
    //   ],
    //   chart: {
    //     height: 400,
    //     type: "candlestick",
    //     toolbar: {
    //       show: false
    //     },
    //     zoom: {
    //       enabled: false
    //     }
    //   },
    //   title: {
    //     text: "Basic BoxPlot Chart",
    //     align: "left"
    //   },
    //   plotOptions: {
    //     boxPlot: {
    //       colors: {
    //         upper: "#5C4742",
    //         lower: "#A5978B"
    //       }
    //     }
    //   }
    // };
    // box and whisker

   }

  ngOnInit(): void {
  }

  backToSummary() {
    this.controller.resetShows();
    this.controller.changeSelectedPlan(0);
  }
























  onSelect(data): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
