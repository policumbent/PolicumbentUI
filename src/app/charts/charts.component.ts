import {AfterViewInit, Component, Inject, NgZone, OnDestroy, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from '@amcharts/amcharts4/themes/material';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements AfterViewInit, OnDestroy {
  private chart: am4charts.XYChart;

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) {}

  // Run the function only in the browser
  browserOnly(f: () => void): void {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit(): void {
    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);
      // am4core.options.minPolylineStep = 5;
      am4core.useTheme(am4themes_material);

      const chart = am4core.create('chartdiv', am4charts.XYChart);

      chart.paddingRight = 20;


      const data = [];
      let speed = 100;
      let speedGPS = 100;
      let heartrate = 100;
      let gear = 100;
      let cadence = 100;
      let power = 1000;

      for (let i = 0; i < 14400; i++) {
        speed += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
        gear += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
        speedGPS += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 104);
        power += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 1000);
        cadence += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 1000);
        // heartrate += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 1000);
        heartrate = i;
        // pp += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 1000);
        data.push({
          // tslint:disable-next-line:max-line-length
            date: new Date(2020, 9, 20, 0, 0, i),
            speed,
            speedGPS,
            power,
            gear,
            heartrate,
          cadence
        });
      }

      const interfaceColors = new am4core.InterfaceColorSet();

      chart.data = data;
      // the following line makes value axes to be arranged vertically.
      chart.leftAxesContainer.layout = 'vertical';

      // uncomment this line if you want to change order of axes
      // chart.bottomAxesContainer.reverseOrder = true;

      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.ticks.template.length = 8;
      dateAxis.renderer.ticks.template.strokeOpacity = 0.1;
      dateAxis.renderer.grid.template.disabled = true;
      dateAxis.renderer.ticks.template.disabled = false;
      dateAxis.renderer.ticks.template.strokeOpacity = 0.2;
      dateAxis.groupData = true;
      dateAxis.renderer.minGridDistance = 50;


      // these two lines makes the axis to be initially zoomed-in
      // dateAxis.start = 0.7;
      // dateAxis.keepSelection = true;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.zIndex = 1;
      valueAxis.renderer.baseGrid.disabled = true;

// Set up axis
      valueAxis.renderer.inside = true;
      valueAxis.height = am4core.percent(25);
      valueAxis.renderer.labels.template.verticalCenter = 'bottom';
      valueAxis.renderer.labels.template.padding(2, 2, 2, 2);
// valueAxis.renderer.maxLabelPosition = 0.95;
      valueAxis.renderer.fontSize = '0.8em';

// uncomment these lines to fill plot area of this axis with some color
      valueAxis.renderer.gridContainer.background.fill = interfaceColors.getFor('alternativeBackground');
      valueAxis.renderer.gridContainer.background.fillOpacity = 0.05;


      const seriesSpeed = chart.series.push(new am4charts.LineSeries());
      seriesSpeed.dataFields.dateX = 'date';
      seriesSpeed.dataFields.valueY = 'speed';
      seriesSpeed.tooltipText = '{valueY.value} km/h';
      seriesSpeed.name = 'Speed';
      const seriesSpeedGps = chart.series.push(new am4charts.LineSeries());
      seriesSpeedGps.dataFields.dateX = 'date';
      seriesSpeedGps.dataFields.valueY = 'speedGPS';
      seriesSpeedGps.tooltipText = '{valueY.value} km/h';
      seriesSpeedGps.name = 'SpeedGps';

      const valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis2.tooltip.disabled = true;

// this makes gap between panels
      valueAxis2.marginTop = 30;
      valueAxis2.renderer.baseGrid.disabled = true;
      valueAxis2.renderer.inside = true;
      valueAxis2.height = am4core.percent(25);
      valueAxis2.zIndex = 3;
      valueAxis2.renderer.labels.template.verticalCenter = 'bottom';
      valueAxis2.renderer.labels.template.padding(2, 2, 2, 2);
// valueAxis2.renderer.maxLabelPosition = 0.95;
      valueAxis2.renderer.fontSize = '0.8em';

// uncomment these lines to fill plot area of this axis with some color
      valueAxis2.renderer.gridContainer.background.fill = interfaceColors.getFor('alternativeBackground');
      valueAxis2.renderer.gridContainer.background.fillOpacity = 0.05;

      const series2 = chart.series.push(new am4charts.LineSeries());
      series2.height = am4core.percent(25);
      series2.dataFields.dateX = 'date';
      series2.dataFields.valueY = 'power';
      series2.yAxis = valueAxis2;
      series2.tooltipText = '{valueY.value}W';
      series2.name = 'Power';

      const valueAxis3 = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis3.tooltip.disabled = true;
      valueAxis3.zIndex = 1;
      valueAxis3.renderer.baseGrid.disabled = true;

// Set up axis
      valueAxis3.marginTop = 30;

      valueAxis3.renderer.inside = true;
      valueAxis3.height = am4core.percent(25);
      valueAxis3.renderer.labels.template.verticalCenter = 'bottom';
      valueAxis3.renderer.labels.template.padding(2, 2, 2, 2);
// valueAxis.renderer.maxLabelPosition = 0.95;
      valueAxis3.renderer.fontSize = '0.8em';

// uncomment these lines to fill plot area of this axis with some color
      valueAxis3.renderer.gridContainer.background.fill = interfaceColors.getFor('alternativeBackground');
      valueAxis3.renderer.gridContainer.background.fillOpacity = 0.05;

      const series3 = chart.series.push(new am4charts.LineSeries());
      series3.dataFields.dateX = 'date';
      series3.dataFields.valueY = 'heartrate';
      series3.tooltipText = '{valueY.value} bpm';
      series3.name = 'Heart Rate';
      series3.yAxis = valueAxis3;

      const valueAxis4 = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis4.tooltip.disabled = true;
      valueAxis4.zIndex = 1;
      valueAxis4.renderer.baseGrid.disabled = true;

// Set up axis
      valueAxis4.marginTop = 30;

      valueAxis4.renderer.inside = true;
      valueAxis4.height = am4core.percent(25);
      valueAxis4.renderer.labels.template.verticalCenter = 'bottom';
      valueAxis4.renderer.labels.template.padding(2, 2, 2, 2);
// valueAxis.renderer.maxLabelPosition = 0.95;
      valueAxis4.renderer.fontSize = '0.8em';

// uncomment these lines to fill plot area of this axis with some color
      valueAxis4.renderer.gridContainer.background.fill = interfaceColors.getFor('alternativeBackground');
      valueAxis4.renderer.gridContainer.background.fillOpacity = 0.05;

      const series4 = chart.series.push(new am4charts.LineSeries());
      series4.dataFields.dateX = 'date';
      series4.dataFields.valueY = 'cadence';
      series4.tooltipText = '{valueY.value} rpm';
      series4.name = 'Cadence';
      series4.yAxis = valueAxis4;

      const series5 = chart.series.push(new am4charts.LineSeries());
      series5.dataFields.dateX = 'date';
      series5.dataFields.valueY = 'gear';
      series5.tooltipText = '{valueY.value}';
      series5.name = 'Gear';
      series5.yAxis = valueAxis4;

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;

      const scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(seriesSpeed);
      // scrollbarX.marginBottom = 20;
      chart.scrollbarX = scrollbarX;
      chart.legend = new am4charts.Legend();

      this.chart = chart;
    });
  }

  ngOnDestroy(): void {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
