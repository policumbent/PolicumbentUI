import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivityService} from '../services/activity.service';
import {Options} from '@angular-slider/ngx-slider';
import {BikeData} from '../models/bikeData.model';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {defaultThrottleConfig} from 'rxjs/internal-compatibility';
import {StatisticsTableComponent} from '../statistics-table/statistics-table.component';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  minValue = 50;
  maxValue = 200;
  startTime: Date;
  endTime: Date;
  device: string;
  bikeName: string;
  date: string;
  allData: BikeData[];
  // filteredData: BikeData[];

  @ViewChild(StatisticsTableComponent)
  table: StatisticsTableComponent;
  // options: Options;
  // chart = {
  //   title: 'test',
  //   type: 'LineChart',
  //   data: []
  // };
  constructor(
    private service: ActivityService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.device = route.snapshot.parent.params.device;
    this.bikeName = route.snapshot.parent.parent.parent.params.bikeName;
    this.date = route.snapshot.parent.params.date;
    this.startTime = new Date(`${this.date} 00:00:00`);
    this.endTime = new Date(`${this.date} 23:59:59`);
    console.log(this.device);
    console.log(this.bikeName);
    console.log(this.date);
    this.allData = [];
    // this.table.setData(allData);
    // this.filteredData = this.allData;
    // this.minValue = 0;
    // this.maxValue = 0;
    this.getData();
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
          this.table.setData(data);
          // this.table.setData(data);
          // this.filteredData = data;
        },
      error => {
          console.log(error);
          this.snackBar.open('Errore durante il recupero dei dati.', 'Chiudi.');
      }
    );
  }

  filterData(): void {
    if (this.allData.length > 0){
      console.log('filter data');
      const filteredData = this.allData
        .filter(t =>
          t.timestampT.getTime() > this.startTime.getTime() &&
          t.timestampT.getTime() < this.endTime.getTime());
      console.log(filteredData.length);
      this.table.setData(filteredData);
    }
  }

  // filterChart(): void {
  //   if (this.filteredData.length === 0) {
  //     return;
  //   }
  //   this.chart.data = this.filteredData.map(e => [e.timestampT.getTime(), e.speed]);
  //   console.log(this.chart.data);
  // }

  ngOnInit(): void {
  }

  startChanged(e): void {
    // console.log('Start time', e);
    this.startTime = e;
    this.filterData();
  }

  endChanged(e): void {
    // console.log('End time', e);
    this.endTime = e;
    this.filterData();
  }
}
