import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription, TimeInterval} from 'rxjs';
import {Bike} from '../models/bike.model';
import {MatSidenav} from '@angular/material/sidenav';
import {ActivatedRoute, Router} from '@angular/router';
import {BikeService} from '../services/bike.service';
import {SidenavService} from '../services/sidenav.service';
import {MatSelectChange} from '@angular/material/select';
import {WeatherStation} from '../models/weatherStation.model';
import {WeatherService} from '../services/weather.service';
import {WeatherData} from '../models/weatherData.model';
import {BikeData} from '../models/bikeData.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {
  interval: any;
  ws: WeatherStation[] = [];
  wsd: WeatherData[] = [];

  @ViewChild(MatSidenav)
  sidenav: MatSidenav;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService) {
    // this.weatherStationName = route.snapshot.firstChild.params.bikeName;
    // console.log(this.weatherStationName);
    // this.sub = route.firstChild.params.subscribe( data => this.weatherStationName = data.name);
    // this.subSidenav = sidenavService.getMessage().subscribe(data => data.open ? this.sidenav.open() : this.sidenav.close());
    // this.ws = [
    //   new WeatherStation(1, 'test'),
    //   new WeatherStation(2, 'ciao qua là'),
    //   new WeatherStation(3, 'Stazione di Stefano')
    // ];
  }

  ngOnInit(): void {
    this.weatherService.getAllStations().subscribe(data => this.ws = data);
    this.interval = setInterval(
      () => this.weatherService.getLastData().subscribe(data => {
        this.wsd = data;
        console.log(data);
      }),
      1000
    );
  }

  getData(stationId: number): WeatherData {
    const resp = this.wsd.find(e => e.stationId === stationId);
    return resp === undefined ?
      new WeatherData(0, 0, 0, '', 0, 0, 0, 0, 0):
      resp;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    // this.sub.unsubscribe();
    // this.subSidenav.unsubscribe();
  }

}
