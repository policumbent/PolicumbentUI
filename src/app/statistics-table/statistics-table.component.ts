import {Component, Input, OnInit} from '@angular/core';
import {TableElement} from '../models/table.element.model';

@Component({
  selector: 'app-statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.css']
})
export class StatisticsTableComponent implements OnInit {
  dataSource: TableElement[] = [];
  displayedColumns: string[] = ['name', 'min', 'max', 'average'];

  @Input()
  set data(data: any[]){
    const v = {
      power: new TableElement('power', 'W'),
      speed: new TableElement('speed', 'km/h'),
      speedGps: new TableElement('speedGps', 'km/h'),
      heartrate: new TableElement('heartrate', 'bpm'),
      cadence: new TableElement('cadence', 'rpm'),
      gear: new TableElement('gear', ''),
      temperature: new TableElement('temperature', '°C'),
      humidity: new TableElement('humidity', '%'),
      pressure: new TableElement('pressure', ''),
      accX: new TableElement('accX', ''),
      accY: new TableElement('accY', ''),
      accZ: new TableElement('accZ', ''),
      accXMax: new TableElement('accXMax', ''),
      accYMax: new TableElement('accYMax', ''),
      accZMax: new TableElement('accZMax', ''),
      cpuTemp: new TableElement('cpuTemp', '°C')
    };
    data.forEach(e =>
      Object.keys(v).forEach(k => v[k].addValue(e[k]))
    );
    this.dataSource = Object.values(v);
    console.log(v.accX.count);
  }

  getValue(value: number, unit: string): string{
    if (value === Number.MAX_SAFE_INTEGER || value === Number.MIN_SAFE_INTEGER){
      return 'NO DATA';
    }
    return `${value} ${unit}`;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
