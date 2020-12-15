import {Component, Input, OnInit} from '@angular/core';
import {WeatherStation} from '../models/weatherStation.model';
import {WeatherData} from '../models/weatherData.model';

@Component({
  selector: 'app-wind-card',
  templateUrl: './wind-card.component.html',
  styleUrls: ['./wind-card.component.css']
})
export class WindCardComponent implements OnInit {

  @Input()
  ws: WeatherStation;
  @Input()
  wsd: WeatherData;
  thresholdConfig = {
    0: {color: 'green'},
    1.2: {color: 'orange'},
    1.7: {color: 'red'}
  };

  constructor() {
    // this.wsd = new WeatherData(0, 2, 45,
    //   'ciao', 35, 60,
    //   9.9, 88.8, 77);
  }

  ngOnInit(): void {
  }

}
