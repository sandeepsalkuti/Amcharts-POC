import { Component, OnInit, Input } from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  private chart: am4charts.XYChart;
  @Input() convertedJSON !: string;
  @Input() passingDataTwo:any;

  constructor() { }

  ngOnInit(): void {
    am4core.useTheme(am4themes_animated);
      let chart = am4core.create("bar-chart", am4charts.XYChart);
      // let monthlyData = JSON.parse(this.convertedJSON);
      // monthlyData = monthlyData.reduce(el => )
      // const chartData = [{
      //   "Month": "Jan",
      //   "No.of Active Accounts": 10000
      // }]
      // chart.data = JSON.parse(this.convertedJSON);
      chart.data = [{
        'month': 'current-month',
        'accounts': this.passingDataTwo[0]
      }, {
        'month': 'previous-six-months',
        'accounts': this.passingDataTwo[1]
      }];
      //chart.dataSource.url="assets/DailyReport.csv";
     // console.log("data:",chart.dataSource.data);
      chart.dataSource.parser = new am4core.CSVParser();
      //chart.dataSource.parser.options.useColumnNames = true;

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "month";
      categoryAxis.title.text = "Month";
      categoryAxis.renderer.minGridDistance = 30;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Number of Accounts";

      let series = chart.series.push(new am4charts.ColumnSeries());
      series.name = "Account Data";
      series.columns.template.tooltipText = "Series: {name}\n month: {categoryX}\n accounts: {valueY}";
      series.columns.template.fill = am4core.color("#104547"); // fill
      series.dataFields.valueY = "accounts";
      series.dataFields.categoryX = "month";


      chart.legend = new am4charts.Legend();
      chart.cursor = new am4charts.XYCursor();

  }

}
