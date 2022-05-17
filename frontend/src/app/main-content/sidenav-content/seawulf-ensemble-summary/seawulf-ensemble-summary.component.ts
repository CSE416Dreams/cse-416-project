import { Component, OnInit, ViewChild } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { DataControllerService } from 'src/app/services/data-controller.service';

import {
  ChartComponent,
  ApexChart,
  ApexPlotOptions,
  ApexTitleSubtitle,
  ApexAxisChartSeries
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-seawulf-ensemble-summary',
  templateUrl: './seawulf-ensemble-summary.component.html',
  styleUrls: ['./seawulf-ensemble-summary.component.css']
})
export class SeawulfEnsembleSummaryComponent implements OnInit {
  /////
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  /////
  selectedHistogram = 0;
  options = ["Range of Majority Minority District", 'Range of Repulican Seat Splits', 'Range of Democratic Seat Splits']

  selectedDem = 0;
  boxOptions = ["White", "African American", "Asian", "Hispanic", "Republican", "Democratic"]; 
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#5AA454', '#A10A28', '#C7B42C']
  };
  colorSchemeSeat: Color = {
    name: 'myScheme2',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#f00', '#00f', '#f0f'],
  }
  SVData = [
    {
      "Florida" : [40.812, 10.296, 10.296]
    },
    {
      "Mississippi" : [36.857, 20.975, 2.298]
    },
    {
      "Georgia" : [12.5, 7.007, 1.836]
    }
  ];

  
  constructor(public controller: DataControllerService) { 
    this.chartOptions = {
      series: [
        {
          type: "boxPlot",
          data: [
            {
              x: "Jan 2015",
              y: [54, 66, 69, 75, 88]
            },
            {
              x: "Jan 2016",
              y: [43, 65, 69, 76, 81]
            },
            {
              x: "Jan 2017",
              y: [31, 39, 45, 51, 59]
            },
            {
              x: "Jan 2018",
              y: [39, 46, 55, 65, 71]
            },
            {
              x: "Jan 2019",
              y: [29, 31, 35, 39, 44]
            },
            {
              x: "Jan 2020",
              y: [41, 49, 58, 61, 67]
            },
            {
              x: "Jan 2021",
              y: [54, 59, 66, 71, 88]
            }
          ]
        }
      ],
      chart: {
        height: 350,
        type: "candlestick",
        zoom: {
          autoScaleYaxis: true,
          
        }
      },
      title: {
        text: "Box & Whisker for "+this.controller.getSelectedState(),
        align: "left"
      },
      plotOptions: {
        boxPlot: {
          colors: {
            upper: "#5C4742",
            lower: "#A5978B"
          }
        }
      }
    }
  }
  ngOnInit(): void {

  }

  changeHist(i : number) {
    this.selectedHistogram = i;
  }

  changeDemographics(i : number) {
    this.selectedDem = i;

    // this.chart.updateOptions({
    //   data: this.controller.getBoxAndWhiskerData()[i]["series"][0].data
    // })
    this.chartOptions.series[0].data = this.controller.getBoxAndWhiskerData()[i]["series"][0].data
  }

}
