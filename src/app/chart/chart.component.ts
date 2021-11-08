import { Component} from '@angular/core';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent {
  private chart: am4charts.XYChart;

  constructor() {}


  ngAfterViewInit() {
    am4core.useTheme(am4themes_animated);
    //am4core.useTheme(am4themes_kelly);

      let chart = am4core.create("chartdiv", am4charts.XYChart);
      chart.data = [{
        "country": "Lithuania",
        "litres": 501,
        "quantity":1
      }, {
        "country": "Czechia",
        "litres": 301,
        "quantity":2
      }, {
        "country": "Ireland",
        "litres": 201,
        "quantity":3
      }, {
        "country": "Germany",
        "litres": 165,
        "quantity":1
      }, {
        "country": "Australia",
        "litres": 139,
        "quantity":1
      }, {
        "country": "Austria",
        "litres": 128,
        "quantity":1
      }, {
        "country": "UK",
        "litres": 99,
        "quantity":1
      }, {
        "country": "Belgium",
        "litres": 60,
        "quantity":1
      }, {
        "country": "The Netherlands",
        "litres": 50,
        "quantity":1
      },
      {
        "country": "India",
        "litres": 80,
        "quantity":1
      },
      {
        "country": "Goa",
        "litres": 90,
        "quantity":1
      },
      {
        "country": "Texas",
        "litres": 120,
        "quantity":1
      },];

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "country";
      categoryAxis.title.text = "Countries";
      categoryAxis.renderer.minGridDistance = 30;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Litres sold (M)";

      let series = chart.series.push(new am4charts.ColumnSeries());
      series.name = "Sales";
      series.columns.template.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
      series.columns.template.fill = am4core.color("#104547"); // fill
      series.dataFields.valueY = "litres";
      series.dataFields.categoryX = "country";


      chart.legend = new am4charts.Legend();
      chart.cursor = new am4charts.XYCursor();

      //piechart
      am4core.useTheme(am4themes_animated);

      let chart1 = am4core.create("chartdiv1", am4charts.PieChart);
chart1.data = [{
  "country": "Lithuania",
  "litres": 501.9
}, {
  "country": "Czech Republic",
  "litres": 301.9
}, {
  "country": "Ireland",
  "litres": 201.1
}, {
  "country": "Germany",
  "litres": 165.8
}, {
  "country": "Australia",
  "litres": 139.9
}, {
  "country": "Austria",
  "litres": 128.3
}, {
  "country": "UK",
  "litres": 99
}, {
  "country": "Belgium",
  "litres": 60
}, {
  "country": "The Netherlands",
  "litres": 50
}];

// Add and configure Series
let pieSeries = chart1.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "litres";
pieSeries.dataFields.category = "country";

// Let's cut a hole in our Pie chart the size of 40% the radius
pieSeries.innerRadius = am4core.percent(40);

// Put a thick white border around each Slice
pieSeries.slices.template.stroke = am4core.color("#4a2abb");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;

chart.legend = new am4charts.Legend();
chart.cursor = new am4charts.XYCursor();






      // pieSeries.labels.template.paddingTop = 0;
      // pieSeries.labels.template.paddingBottom = 0;
      // pieSeries.labels.template.fontSize = 10;
      // chart.scrollbarX = new am4core.Scrollbar();
      // chart.scrollbarY = new am4core.Scrollbar();

  //     chart.paddingRight = 20;

  //     let data = [];
  //     let visits = 10;
  //     for (let i = 1; i < 366; i++) {
  //       visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
  //       data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
  //     }

  //     chart.data = data;

  //     let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  //     dateAxis.renderer.grid.template.location = 0;

  //     let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  //     valueAxis.tooltip.disabled = true;
  //     valueAxis.renderer.minWidth = 35;

  //     let series = chart.series.push(new am4charts.ColumnSeries());
  //     series.dataFields.dateX = "date";
  //     series.dataFields.valueY = "value";
  //     series.tooltipText = "{valueY.value}";

  //     chart.cursor = new am4charts.XYCursor();

  //     let scrollbarX = new am4charts.XYChartScrollbar();
  //     scrollbarX.series.push(series);
  //     chart.scrollbarX = scrollbarX;

  //     this.chart = chart;
  //   });
  // }

  // ngOnDestroy() {
  //   // Clean up chart when the component is removed
  //   this.browserOnly(() => {
  //     if (this.chart) {
  //       this.chart.dispose();
  //     }
  //   });
  // }
    }
}
