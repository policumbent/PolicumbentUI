import { Component, OnInit } from '@angular/core';
import {NavModel} from '../models/NavModel';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-day-data',
  templateUrl: './day-data.component.html',
  styleUrls: ['./day-data.component.css']
})
export class DayDataComponent implements OnInit {
  links: Array<NavModel> = [
    // new NavModel('./chart', 'Chart'),
    new NavModel('./charts', 'Charts'),
    new NavModel('./statistics', 'Statistics')
  ];
  device: string;
  date: string;
  bike: string;

  constructor(private route: ActivatedRoute) {
    this.device = route.snapshot.params.device;
    this.date = route.snapshot.params.date;
    this.bike = route.parent.parent.snapshot.params.bikeName;
  }

  ngOnInit(): void {
  }

}
