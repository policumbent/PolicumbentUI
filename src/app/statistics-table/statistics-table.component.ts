import {Component, Input, OnInit} from '@angular/core';
import {TableElement} from '../models/table.element.model';
import {BikeData} from '../models/bikeData.model';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.css']
})
export class StatisticsTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'min', 'max', 'average'];
  // private elements: BikeData[] = [];
  dataSource: MatTableDataSource<TableElement>;
  private elements: TableElement[] = [];

  @Input()
  weather = false;

  setData(data: BikeData[]): void{
    console.log('set data');
    this.elements.forEach(e => {
        e.reset();
        data.forEach(d => e.addValue(d[e.name]));
      }
    );
    this.dataSource = new MatTableDataSource<any>([...this.elements]);
  }

  getValue(value: number, unit: string): string{
    if (value === Number.MAX_SAFE_INTEGER || value === Number.MIN_SAFE_INTEGER){
      return 'NO DATA';
    }
    return `${value} ${unit}`;
  }

  constructor() {
    this.dataSource = new MatTableDataSource<TableElement>(this.elements);
  }

  ngOnInit(): void {
    if (!this.weather){
      this. elements = [
        new TableElement('power', 'W'),
        new TableElement('speed', 'km/h'),
        new TableElement('speedGps', 'km/h'),
        new TableElement('heartrate', 'bpm'),
        new TableElement('cadence', 'rpm'),
        new TableElement('gear', ''),
        new TableElement('temperature', '°C'),
        new TableElement('humidity', '%'),
        new TableElement('pressure', ''),
        new TableElement('accX', ''),
        new TableElement('accY', ''),
        new TableElement('accZ', ''),
        new TableElement('accXMax', ''),
        new TableElement('accYMax', ''),
        new TableElement('accZMax', ''),
        new TableElement('cpuTemp', '°C')
      ];
    }
  }

}
