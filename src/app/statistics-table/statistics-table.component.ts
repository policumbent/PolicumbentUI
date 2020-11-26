import {Component, Input, OnInit} from '@angular/core';
import {TableElement} from '../models/table.element.model';
import {BikeData} from '../models/bikeData.model';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.css']
})
export class StatisticsTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'min', 'max', 'average'];
  // private elements: BikeData[] = [];
  dataSource: MatTableDataSource<TableElement>;
  private elements: TableElement[] = [
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
  }

}
