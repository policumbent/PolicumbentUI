import {Component, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {BikeData} from '../models/bikeData.model';
import {concat, Subscription} from 'rxjs';
import * as am4charts from '@amcharts/amcharts4/charts';
import {ActivityService} from '../services/activity.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CsvService} from '../services/csv.service';
import {isPlatformBrowser} from '@angular/common';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from '@amcharts/amcharts4/themes/material';
import {WeatherService} from '../services/weather.service';
import {WeatherData} from '../models/weatherData.model';

@Component({
  selector: 'app-weather-charts',
  templateUrl: './weather-charts.component.html',
  styleUrls: ['./weather-charts.component.css']
})
export class WeatherChartsComponent implements OnDestroy {

  data: any[];
  date: string;
  sub: Subscription;
  subCsv: Subscription;
  startTime: Date;
  endTime: Date;
  private chart: am4charts.XYChart;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private zone: NgZone,
    private service: WeatherService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private csvService: CsvService
  ) {
    this.date = route.snapshot.parent.params.date;
    this.startTime = new Date(`${this.date} 00:00:00`);
    this.endTime = new Date(`${this.date} 23:59:59`);
    this.sub = route.parent.params.subscribe(
      data => {
        // console.log(data);
        this.date = data.date;
        this.disposeChart();
        this.getData();
      },
      error => snackBar.open('An error has occured during loading.', 'Close')
    );
    this.subCsv = csvService.getMessage().subscribe(() => alert('Not implemented yet'));
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

  setOppositeAxisProperties(size: number, axis: am4charts.ValueAxis, syncAxis: am4charts.ValueAxis): void{
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
    series.height = am4core.percent(20);
    series.dataFields.dateX = 'timestampT';
    series.dataFields.valueY = field;
    series.yAxis = axis;
    series.tooltipText = `${name} {valueY.value}${unit}`;
    series.name = name;
  }

  loadChart(i: number[]): void {
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
      dateAxis.events.on('startchanged', ev => this.startTime = new Date(ev.target.minZoomed));
      dateAxis.events.on('endchanged', ev => this.endTime = new Date(ev.target.maxZoomed));
      // function dateAxisChanged(ev): void {
      //   this.start= new Date(ev.target.minZoomed);
      //   const end = new Date(ev.target.maxZoomed);
      //   console.log('New range: ' + start + ' -- ' + end);
      // }

      // these two lines makes the axis to be initially zoomed-in
      // dateAxis.start = 0.7;
      // dateAxis.keepSelection = true;

      // impostazioni assi velocità
      const speedAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setAxisProperties(20, speedAxis, interfaceColors);

      // impostazioni assi direzione vento
      const directionAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setAxisProperties(20, directionAxis, interfaceColors);

      // impostazioni assi cadenza
      const temperatureAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setAxisProperties(20, temperatureAxis, interfaceColors);

      // impostazioni assi cadenza
      const humidityAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setAxisProperties(20, humidityAxis, interfaceColors);

      // impostazioni assi pressione
      const pressureAxis = chart.yAxes.push(new am4charts.ValueAxis());
      this.setAxisProperties(20, pressureAxis, interfaceColors);

      // const seriesSpeed = chart.series.push(new am4charts.LineSeries());
      // const e = 1;
      //
      // this.setSeriesProperties(20, `Speed ${e}`, `windSpeed_${e}`, 'm/s', seriesSpeed, speedAxis);
      const seriesSpeed = [];
      i.forEach(e => {
        seriesSpeed[e] = chart.series.push(new am4charts.LineSeries());
        this.setSeriesProperties(20, `Speed ${e}`, `windSpeed_${e}`, 'm/s', seriesSpeed[e], speedAxis);

        const seriesDirection = chart.series.push(new am4charts.LineSeries());
        this.setSeriesProperties(20, `Direction ${e}`, `windDirection_${e}`, '°', seriesDirection, directionAxis);

        const seriesTemperature = chart.series.push(new am4charts.LineSeries());
        this.setSeriesProperties(20, `Temperature ${e}`, `temperature_${e}`, '°C', seriesTemperature, temperatureAxis);

        const seriesHumidity = chart.series.push(new am4charts.LineSeries());
        this.setSeriesProperties(20, `Humidity ${e}`, `humidity_${e}`, '%', seriesHumidity, humidityAxis);

        const seriesPressure = chart.series.push(new am4charts.LineSeries());
        this.setSeriesProperties(20, `Pressure ${e}`, `pressure_${e}`, 'hPa', seriesPressure, pressureAxis);
      });

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;

      const scrollbarX = new am4charts.XYChartScrollbar();
      // scrollbarX.series.push(seriesSpeed);
      seriesSpeed.forEach(ss => scrollbarX.series.push(ss));
      // scrollbarX.marginBottom = 20;
      chart.scrollbarX = scrollbarX;
      // chart.legend = new am4charts.Legend();

      this.chart = chart;
    });
  }

  changeName(wd: WeatherData[]): any {
    const newData: any[] = [];
    const i: number[] = [];
    wd.forEach(e => {
      // tslint:disable-next-line:no-unused-expression
      i.findIndex(ie => e.stationId === ie) === -1 ? i.push(e.stationId) : null;
      const ne = {};
      ne[`windSpeed_${e.stationId}`] = e.windSpeed;
      ne[`windDirection_${e.stationId}`] = e.windDirection;
      ne[`temperature_${e.stationId}`] = e.temperature;
      ne[`humidity_${e.stationId}`] = e.humidity;
      ne[`pressure_${e.stationId}`] = e.pressure;
      ne[`timestamp`] = e.timestamp;
      ne[`timestampT`] = e.timestampT;
      newData.push(ne);
    });
    return {newData, i};
  }

  getData(): void{
    this.service.getData(
      `${this.date} 00:00:00`,
      `${this.date} 23:59:59`
    ).subscribe(
      data => {
        console.log(data);
        const elements = this.changeName(data);
        this.data = elements.newData;
        console.log(this.data);
        this.loadChart(elements.i);
      },
      error => {
        console.log(error);
        this.snackBar.open('Errore durante il recupero dei dati.', 'Chiudi.');
      }
    );
  }

  filterData(): WeatherData[]{
    return this.data.filter(e =>
      e.timestampT.getTime() >= this.startTime.getTime() &&
      e.timestampT.getTime() <= this.endTime.getTime());
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
    this.subCsv.unsubscribe();
  }
}
