import {Component, OnInit} from '@angular/core';
import {ActivityService} from '../services/activity.service';
import {Options} from '@angular-slider/ngx-slider';
import {BikeData} from '../models/bikeData.model';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {defaultThrottleConfig} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  minValue = 50;
  maxValue = 200;
  device: string;
  bikeName: string;
  date: string;
  allData: BikeData[];
  filteredData: BikeData[];
  options: Options;
  chart = {
    title: 'test',
    type: 'LineChart',
    data: [
      ['London', 8136000],
    ['New York', 8538000],
  ['Paris', 2244000],
  ['Berlin', 3470000],
  ['Kairo', 19500000]]
  };
  constructor(
    private service: ActivityService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.device = route.snapshot.parent.params.device;
    this.bikeName = route.snapshot.parent.parent.parent.params.bikeName;
    this.date = route.snapshot.parent.params.date;
    console.log(this.device);
    console.log(this.bikeName);
    console.log(this.date);
    this.allData = [];
    this.filteredData = this.allData;
    this.minValue = 0;
    this.maxValue = 0;
    this.getData();
  }

  minTime(): number {
    if (this.allData.length === 0){
      return 0;
    }
    return this.allData.map(t => t.timestampT.getTime())
      .reduce((a, b) => a < b ? a : b);
  }

  maxTime(): number {
    if (this.allData.length === 0){
      return 0;
    }
    return this.allData.map(t => t.timestampT.getTime())
      .reduce((a, b) => a > b ? a : b);
  }

  getData(): void{
    this.service.getData(
      this.bikeName,
      `${this.date} 00:00:00`,
      `${this.date} 23:59:59`,
      this.service.getDeviceInt(this.device)
      ).subscribe(
        data => {
          // console.log(data);
          this.allData = data;
          this.filteredData = data;
          this.filterChart();
          if (data.length > 0) {
            this.minValue = this.minTime();
            this.maxValue = this.maxTime();
            this.options = {
              floor: this.minTime(),
              ceil: this.maxTime(),
              translate: (value: number): string => {
                const d = new Date(value);
                // todo: scriverla meglio
                return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
              }
            };
          }
        },
      error => {
          console.log(error);
          this.snackBar.open('Errore durante il recupero dei dati.', 'Chiudi.');
      }
    );
  }

  filterData(): void {
    if (this.allData.length > 0){
      this.filteredData = this.allData
        .filter(t => t.timestampT.getTime() > this.minValue && t.timestampT.getTime() < this.maxValue);
      this.filterChart();
    }
  }

  filterChart(): void {
    if (this.filteredData.length === 0) {
      return;
    }
    this.chart.data = this.filteredData.map(e => [e.timestampT.getTime(), e.speed]);
    console.log(this.chart.data);
  }

  ngOnInit(): void {
  }

}
