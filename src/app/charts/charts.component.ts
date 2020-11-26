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
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnDestroy {
  data: BikeData[];
  bikeName: string;
  deviceName: string;
  date: string;
  sub: Subscription;

  private chart: am4charts.XYChart;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private zone: NgZone,
    private service: ActivityService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.deviceName = route.snapshot.parent.params.device;
    this.bikeName = route.snapshot.parent.parent.parent.params.bikeName;
    this.date = route.snapshot.parent.params.date;
    this.sub = route.parent.params.subscribe(
      data => {
        // console.log(data);
        this.date = data.date;
        this.disposeChart();
        this.getData();
      },
      error => snackBar.open('An error has occured during loading.', 'Close')
    );
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

  setOppositeAxisProperties(size: number, axis: am4charts.ValueAxis, syncAxis: am4charts.ValueAxis,): void{
    axis.renderer.opposite = true;
    axis.marginBottom = 10;
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
      this.setAxisProperties(25, speedAxis, interfaceColors);

      // impostazioni assi potenza
      const powerAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setAxisProperties(25, powerAxis, interfaceColors);

      // impostazioni assi cadenza
      const cadenceAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setAxisProperties(25, cadenceAxis, interfaceColors);

      // impostazioni assi cadenza
      const temperatureAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setAxisProperties(10, temperatureAxis, interfaceColors);

      // impostazioni assi cadenza
      const accelerationAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setAxisProperties(15, accelerationAxis, interfaceColors);

      // per gli opposite si parte dal basso verso l'alto
      // placeholder perchè l'ultimo non ha il doppio asse
      const placeholderAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setOppositeAxisProperties(15, placeholderAxis, accelerationAxis);

      // impostazioni assi umidità
      const humidityAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setOppositeAxisProperties(10, humidityAxis, temperatureAxis);

      // impostazioni assi marcia
      const gearAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setOppositeAxisProperties(25, gearAxis, cadenceAxis);

      // impostazioni heartrate
      const heartrateAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setOppositeAxisProperties(25, heartrateAxis, powerAxis);

      // impostazioni heartrate
      const distanceAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setOppositeAxisProperties(25, distanceAxis, speedAxis);


      const seriesSpeed = chart.series.push(new am4charts.LineSeries());
      this.setSeriesProperties(25, 'Speed', 'speed', 'km/h', seriesSpeed, speedAxis);

      const seriesSpeedGps = chart.series.push(new am4charts.LineSeries());
      this.setSeriesProperties(25, 'SpeedGps', 'speedGps', 'km/h', seriesSpeedGps, speedAxis);

      const seriesDistance = chart.series.push(new am4charts.LineSeries());
      this.setSeriesProperties(25, 'Distance', 'distance', 'km', seriesDistance, distanceAxis)

      const seriesPower = chart.series.push(new am4charts.LineSeries());
      this.setSeriesProperties(25, 'Power', 'power', 'W', seriesPower, powerAxis);

      const seriesHeartRate = chart.series.push(new am4charts.LineSeries());
      this.setSeriesProperties(25, 'Heart Rate', 'heartrate', 'bpm', seriesHeartRate, heartrateAxis);

      const seriesCadence = chart.series.push(new am4charts.LineSeries());
      this.setSeriesProperties(25, 'Cadence', 'cadence', 'rpm', seriesCadence, cadenceAxis);

      const seriesGear = chart.series.push(new am4charts.LineSeries());
      this.setSeriesProperties(25, 'Gear', 'gear', '', seriesGear, gearAxis);

      const seriesTemperature = chart.series.push(new am4charts.LineSeries());
      this.setSeriesProperties(10, 'Temperature', 'temperature', '°C', seriesTemperature, temperatureAxis);

      const seriesHumidity = chart.series.push(new am4charts.LineSeries());
      this.setSeriesProperties(10, 'Humidity', 'humidity', '%', seriesHumidity, humidityAxis);

      const seriesXAcceleration = chart.series.push(new am4charts.LineSeries());
      this.setSeriesProperties(10, 'Avg X Acceleration', 'accX', '', seriesXAcceleration, accelerationAxis);

      const seriesXMaxAcceleration = chart.series.push(new am4charts.LineSeries());
      this.setSeriesProperties(10, 'Max X Acceleration', 'accXMax', '', seriesXMaxAcceleration, accelerationAxis);

      // const seriesYAcceleration = chart.series.push(new am4charts.LineSeries());
      // this.setSeriesProperties(10, 'Avg Y Acceleration', 'accY', '', seriesYAcceleration, accelerationAxis);
      //
      // const seriesYMaxAcceleration = chart.series.push(new am4charts.LineSeries());
      // this.setSeriesProperties(10, 'Max Y Acceleration', 'accYMax', '', seriesYMaxAcceleration, accelerationAxis);
      //
      // const seriesZAcceleration = chart.series.push(new am4charts.LineSeries());
      // this.setSeriesProperties(10, 'Avg Z Acceleration', 'accZ', '', seriesZAcceleration, accelerationAxis);
      //
      // const seriesZMaxAcceleration = chart.series.push(new am4charts.LineSeries());
      // this.setSeriesProperties(10, 'Max Z Acceleration', 'accZMax', '', seriesZMaxAcceleration, accelerationAxis);


      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;

      const scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(seriesSpeed);
      // scrollbarX.marginBottom = 20;
      chart.scrollbarX = scrollbarX;
      // chart.legend = new am4charts.Legend();

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
        // console.log(data);
        this.data = data;
        this.loadChart();
      },
      error => {
        console.log(error);
        this.snackBar.open('Errore durante il recupero dei dati.', 'Chiudi.');
      }
    );
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
    this.sub.unsubscribe();
  }
}
