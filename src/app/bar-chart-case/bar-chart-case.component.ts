import { Component, OnInit, Input } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-bar-chart-case',
  templateUrl: './bar-chart-case.component.html',
  styleUrls: ['./bar-chart-case.component.css']
})
export class BarChartCaseComponent implements OnInit {

  private chart: am4charts.XYChart;
  @Input() passingDataOne:any;

  constructor() { }

  ngOnInit(): void {
    am4core.useTheme(am4themes_animated);


    let chart = am4core.create("bar-chart-case", am4charts.XYChart);
console.log("retail-individual:", this.passingDataOne[0]);
console.log("retail-joint:", this.passingDataOne[1]);
console.log("retail-IRA:", this.passingDataOne[2]);
    chart.data = [{
      'account-type': 'Retail Individual',
      'volume': this.passingDataOne[0]
    }, {
      'account-type': 'Retail Joint',
      'volume': this.passingDataOne[1]
    }, {
      'account-type': 'IRA',
      'volume': this.passingDataOne[2]
    }];

    // chart.data = JSON.parse(this.convertedJSON);

    chart.dataSource.parser = new am4core.CSVParser();

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "account-type";
    categoryAxis.title.text = "Account-Type";
    categoryAxis.renderer.minGridDistance = 30;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Number of Accounts";

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.name = "Account Data";
    series.columns.template.tooltipText = "Series: {name}\naccount-type: {categoryX}\nvolume: {valueY}";
    series.columns.template.fill = am4core.color("#104547"); // fill
    series.dataFields.valueY = "volume";
    series.dataFields.categoryX = "account-type";


    chart.legend = new am4charts.Legend();
    chart.cursor = new am4charts.XYCursor();

}

  }


