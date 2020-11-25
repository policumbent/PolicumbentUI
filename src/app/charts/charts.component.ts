import {AfterViewInit, Component, Inject, NgZone, OnDestroy, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from '@amcharts/amcharts4/themes/material';
import {BikeData} from '../models/bikeData.model';
import {ActivityService} from '../services/activity.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements AfterViewInit, OnDestroy {
  data: BikeData[];
  bikeName: string = 'taurusx';
  deviceName: string = 'marta';
  date: string = '2020-11-24';

  private chart: am4charts.XYChart;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private zone: NgZone,
    private service: ActivityService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  // Run the function only in the browser
  browserOnly(f: () => void): void {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit(): void {
    this.getData();
  }

  setAxisProperty(size: number, axis: am4charts.ValueAxis, interfaceColors: am4core.InterfaceColorSet): void {
    axis.tooltip.disabled = true;
    axis.zIndex = 1;
    axis.marginTop = 10;
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

  setOppositeAxisProperty(size: number, axis: am4charts.ValueAxis, syncAxis: am4charts.ValueAxis,): void{
    axis.renderer.opposite = true;
    axis.renderer.labels.template.verticalCenter = 'bottom';
    axis.renderer.labels.template.padding(2, 2, 2, 2);
    axis.renderer.maxLabelPosition = 0.95;
    axis.renderer.fontSize = '0.8em';
    axis.syncWithAxis = syncAxis;
    axis.renderer.inside = true;
    axis.tooltip.disabled = true;
    axis.height = am4core.percent(size);
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
      dateAxis.events.on('startchanged', dateAxisChanged);
      dateAxis.events.on('endchanged', dateAxisChanged);
      function dateAxisChanged(ev): void {
        const start = new Date(ev.target.minZoomed);
        const end = new Date(ev.target.maxZoomed);
        console.log('New range: ' + start + ' -- ' + end);
      }

      // these two lines makes the axis to be initially zoomed-in
      // dateAxis.start = 0.7;
      // dateAxis.keepSelection = true;


      // impostazioni assi velocità
      const speedAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setAxisProperty(25, speedAxis, interfaceColors);

      // impostazioni assi potenza
      const powerAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setAxisProperty(25, powerAxis, interfaceColors);

      // impostazioni assi cadenza
      const cadenceAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setAxisProperty(25, cadenceAxis, interfaceColors);

      // impostazioni assi cadenza
      const temperatureAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setAxisProperty(25, temperatureAxis, interfaceColors);

      // impostazioni assi cadenza
      const accelerationAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setAxisProperty(25, accelerationAxis, interfaceColors);

      // per gli opposite si parte dal basso verso l'alto
      // placeholder perchè l'ultimo non ha il doppio asse
      const placeholderAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setOppositeAxisProperty(25, placeholderAxis, accelerationAxis);

      // impostazioni assi umidità
      const humidityAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setOppositeAxisProperty(25, humidityAxis, temperatureAxis);

      // impostazioni assi marcia
      const gearAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setOppositeAxisProperty(25, gearAxis, cadenceAxis);

      // impostazioni heartrate
      const heartrateAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setOppositeAxisProperty(25, heartrateAxis, powerAxis);

      // impostazioni heartrate
      const distanceAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setOppositeAxisProperty(25, distanceAxis, speedAxis);











      const seriesSpeed = chart.series.push(new am4charts.LineSeries());
      seriesSpeed.dataFields.dateX = 'timestampT';
      seriesSpeed.dataFields.valueY = 'speed';
      seriesSpeed.tooltipText = '{valueY.value} km/h';
      seriesSpeed.name = 'Speed';
      const seriesSpeedGps = chart.series.push(new am4charts.LineSeries());
      seriesSpeedGps.dataFields.dateX = 'timestampT';
      seriesSpeedGps.dataFields.valueY = 'speedGps';
      seriesSpeedGps.tooltipText = '{valueY.value} km/h';
      seriesSpeedGps.name = 'SpeedGps';
      seriesSpeedGps.yAxis = speedAxis;



      const series2 = chart.series.push(new am4charts.LineSeries());
      series2.height = am4core.percent(25);
      series2.dataFields.dateX = 'timestampT';
      series2.dataFields.valueY = 'power';
      series2.yAxis = powerAxis;
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
// speedAxis.renderer.maxLabelPosition = 0.95;
      valueAxis3.renderer.fontSize = '0.8em';

// uncomment these lines to fill plot area of this axis with some color
      valueAxis3.renderer.gridContainer.background.fill = interfaceColors.getFor('alternativeBackground');
      valueAxis3.renderer.gridContainer.background.fillOpacity = 0.05;

      const series3 = chart.series.push(new am4charts.LineSeries());
      series3.dataFields.dateX = 'timestampT';
      series3.dataFields.valueY = 'heartrate';
      series3.tooltipText = '{valueY.value} bpm';
      series3.name = 'Heart Rate';
      series3.yAxis = heartrateAxis;



      const series4 = chart.series.push(new am4charts.LineSeries());
      series4.dataFields.dateX = 'timestampT';
      series4.dataFields.valueY = 'cadence';
      series4.tooltipText = '{valueY.value} rpm';
      series4.name = 'Cadence';
      series4.yAxis = cadenceAxis;

      const series5 = chart.series.push(new am4charts.LineSeries());
      series5.dataFields.dateX = 'timestampT';
      series5.dataFields.valueY = 'gear';
      series5.tooltipText = '{valueY.value}';
      series5.name = 'Gear';
      series5.yAxis = gearAxis;

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

  getData(): void{
    this.service.getData(
      this.bikeName,
      `${this.date} 00:00:00`,
      `${this.date} 23:59:59`,
      this.service.getDeviceInt(this.deviceName)
    ).subscribe(
      data => {
        console.log(data);
        this.data = data;
        this.loadChart();
      },
      error => {
        console.log(error);
        this.snackBar.open('Errore durante il recupero dei dati.', 'Chiudi.');
      }
    );
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
