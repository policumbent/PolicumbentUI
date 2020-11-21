import {Component, OnInit} from '@angular/core';
import {ActivityService} from '../services/activity.service';
import {Options} from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  minValue = 50;
  maxValue = 200;
  allData: any[];
  filteredData: any[];
  options: Options;
  constructor(private activityService: ActivityService) {
    // activityService.getData(
    //   'taurus',
    //   '2010-10-07 14:44:25',
    //   '2030-10-07 16:32:29',
    //   '1',
    //   true)
    //   .subscribe(data => console.log(data));
    this.allData = this.demoData();
    this.filteredData = this.allData;
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

  minTime(): number {
    return this.allData.map(t => t.timestamp.getTime())
      .reduce((a, b) => a < b ? a : b);
  }

  maxTime(): number {
    return this.allData.map(t => t.timestamp.getTime())
      .reduce((a, b) => a > b ? a : b);
  }

  demoData(): any[] {
    const data = [];
    let speed = 100;
    let speedGps = 100;
    let heartrate = 100;
    let gear = 100;
    let cadence = 100;
    let power = 1000;
    let temperature = 20;
    let humidity = 20;

    for (let i = 0; i < 14400; i++) {
      speed += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
      gear += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
      speedGps += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 104);
      power += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 1000);
      cadence += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 1000);
      temperature += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      humidity += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 1000);
      // heartrate += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 1000);
      heartrate = i;
      // pp += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 1000);
      data.push({
        // tslint:disable-next-line:max-line-length
        timestamp: new Date(2020, 9, 20, 0, 0, i),
        speed,
        speedGps,
        power,
        gear,
        heartrate,
        cadence,
        temperature,
        humidity
      });
    }
    return data;
  }

  filterData(): void {
    this.filteredData = this.allData
      .filter(t => t.timestamp.getTime() > this.minValue && t.timestamp.getTime() < this.maxValue);
}

  ngOnInit(): void {
  }

}
