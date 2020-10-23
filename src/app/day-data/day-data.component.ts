import { Component, OnInit } from '@angular/core';
import {NavModel} from '../models/NavModel';

@Component({
  selector: 'app-day-data',
  templateUrl: './day-data.component.html',
  styleUrls: ['./day-data.component.css']
})
export class DayDataComponent implements OnInit {
  links: Array<NavModel> = [
    new NavModel('./chart', 'Chart'),
    new NavModel('./charts', 'Charts'),
    new NavModel('./statistics', 'Statistics')
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
