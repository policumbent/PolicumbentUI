import {Component, EventEmitter, Inject, Input, NgZone, OnDestroy, OnInit, Output, PLATFORM_ID} from '@angular/core';
import {BikeData} from '../models/bikeData.model';
import {Subscription} from 'rxjs';
import * as am4charts from '@amcharts/amcharts4/charts';
import {ActivityService} from '../services/activity.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {isPlatformBrowser} from '@angular/common';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from '@amcharts/amcharts4/themes/material';

@Component({
  selector: 'app-selection-chart',
  templateUrl: './selection-chart.component.html',
  styleUrls: ['./selection-chart.component.css']
})
export class SelectionChartComponent implements OnDestroy {
  @Output()
  startTime: EventEmitter<Date>;
  @Output()
  endTime: EventEmitter<Date>;

  data: BikeData[] = [];
  bikeName: string;
  deviceName: string;
  date: string;
  sub: Subscription;
  private chart: am4charts.XYChart;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private zone: NgZone,
  ) {
    this.startTime = new EventEmitter();
    this.endTime = new EventEmitter();
    this.disposeChart();
    this.loadChart();
  }

  // Run the function only in the browser
  browserOnly(f: () => void): void {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  setAxisProperties(size: number, axis: am4charts.ValueAxis, interfaceColors: am4core.InterfaceColorSet): void {
    axis.tooltip.disabled = true;
    axis.zIndex = 1;
    // axis.marginTop = 10;
    axis.renderer.baseGrid.disabled = true;
    axis.renderer.inside = true;
    axis.height = am4core.percent(size);
    axis.renderer.labels.template.verticalCenter = 'bottom';
    axis.renderer.labels.template.padding(2, 2, 2, 2);
    // speedAxis.renderer.maxLabelPosition = 0.95;
    axis.renderer.fontSize = '0.8em';
    // uncomment these lines to fill plot area of this axis with some color
    axis.renderer.gridContainer.background.fill = interfaceColors.getFor('alternativeBackground');
    axis.renderer.gridContainer.background.fillOpacity = 0.05;
  }

  setOppositeAxisProperties(size: number, axis: am4charts.ValueAxis, syncAxis: am4charts.ValueAxis): void{
    axis.renderer.opposite = true;
    // axis.marginBottom = 10;
    axis.renderer.labels.template.verticalCenter = 'bottom';
    axis.renderer.labels.template.padding(2, 2, 2, 2);
    axis.renderer.maxLabelPosition = 0.95;
    axis.renderer.fontSize = '0.8em';
    // axis.syncWithAxis = syncAxis;
    axis.renderer.inside = true;
    axis.tooltip.disabled = true;
    axis.height = am4core.percent(size);
  }

  setSeriesProperties(size: number, name: string, field: string, unit: string,
                      series: am4charts.LineSeries, axis: am4charts.ValueAxis): void{
    series.height = am4core.percent(25);
    series.dataFields.dateX = 'timestampT';
    series.dataFields.valueY = field;
    series.yAxis = axis;
    series.tooltipText = `${name} {valueY.value}${unit}`;
    series.name = name;
  }

  loadChart(): void {
    // Chart code goes in here
    this.browserOnly(() => {

      // configurazione generale grafico
      am4core.useTheme(am4themes_animated);
      // am4core.options.minPolylineStep = 5;
      am4core.useTheme(am4themes_material);
      const chart = am4core.create('chartdiv', am4charts.XYChart);
      chart.paddingRight = 20;
      const interfaceColors = new am4core.InterfaceColorSet();

      chart.data = this.data;
      // the following line makes value axes to be arranged vertically.
      chart.leftAxesContainer.layout = 'vertical';
      chart.rightAxesContainer.layout = 'vertical';

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
      dateAxis.events.on('startchanged',
        (ev) =>
          this.startTime.emit(new Date(ev.target.minZoomed)));
      dateAxis.events.on('endchanged', (ev) =>
        this.endTime.emit(new Date(ev.target.maxZoomed)));
      // function dateAxisChanged(ev): void {
      //   const start = new Date(ev.target.minZoomed);
      //   const end = new Date(ev.target.maxZoomed);
      //   console.log('New range: ' + start + ' -- ' + end);
      // }

      // these two lines makes the axis to be initially zoomed-in
      // dateAxis.start = 0.7;
      // dateAxis.keepSelection = true;


      // impostazioni assi velocità
      const speedAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setAxisProperties(100, speedAxis, interfaceColors);

      const distanceAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setOppositeAxisProperties(100, distanceAxis, speedAxis);

      const seriesSpeed = chart.series.push(new am4charts.LineSeries());
      this.setSeriesProperties(100, 'Speed', 'speed', 'km/h', seriesSpeed, speedAxis);

      const seriesSpeedGps = chart.series.push(new am4charts.LineSeries());
      this.setSeriesProperties(100, 'SpeedGps', 'speedGps', 'km/h', seriesSpeedGps, speedAxis);

      const seriesDistance = chart.series.push(new am4charts.LineSeries());
      this.setSeriesProperties(100, 'Distance', 'distance', 'km', seriesDistance, distanceAxis);

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;

      const scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(seriesSpeed);
      // scrollbarX.marginBottom = 20;
      chart.scrollbarX = scrollbarX;
      // chart.legend = new am4charts.Legend();
      // chart.legend.maxHeight = 150;
      // chart.legend.maxWidth = 300;
      // chart.legend.scrollable = true;

      this.chart = chart;
    });
  }

  @Input()
  set Data(data: BikeData[]){
    this.data = data;
    this.disposeChart();
    this.loadChart();
  }
  disposeChart(): void {
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up chart when the component is removed
    this.disposeChart();
  }
}
