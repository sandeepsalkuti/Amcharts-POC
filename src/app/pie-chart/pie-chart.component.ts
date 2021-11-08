import { Component, OnInit, Input } from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  private chart: am4charts.XYChart;
  @Input() passingData:any;

  constructor() { }

  ngOnInit(): void {
    let chart1 = am4core.create("pie-chart", am4charts.PieChart);
    console.log("pie-chart-unfunded:", this.passingData[0]);
    console.log("pie-chart-termination:", this.passingData[1]);
    chart1.data = [{
      'accounts': 'unfunded',
      'no-of-accounts': this.passingData[0]
    }, {
      'accounts': 'termination',
      'no-of-accounts': this.passingData[1]
    }];

    // Add and configure Series
let pieSeries = chart1.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "no-of-accounts";
pieSeries.dataFields.category = "accounts";

// Let's cut a hole in our Pie chart the size of 40% the radius
pieSeries.innerRadius = am4core.percent(40);

// Put a thick white border around each Slice
pieSeries.slices.template.stroke = am4core.color("#4a2abb");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;

chart1.legend = new am4charts.Legend();

  }

}
