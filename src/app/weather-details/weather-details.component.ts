import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatSidenav} from '@angular/material/sidenav';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivityService} from '../services/activity.service';
import {SidenavService} from '../services/sidenav.service';
import {MatSelectChange} from '@angular/material/select';
import {number} from '@amcharts/amcharts4/core';
import {WeatherService} from '../services/weather.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit, OnDestroy {
  dates: string[] = [];
  device: string;
  bikeName: string;
  sub: Subscription;
  subSidenav: Subscription;

  @ViewChild(MatSidenav)
  sidenav: MatSidenav;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: WeatherService,
    private sidenavService: SidenavService) {
    console.log(route.snapshot.firstChild.params);
    this.subSidenav = sidenavService.getMessage().subscribe(data => data.open ? this.sidenav.open() : this.sidenav.close());
  }

  ngOnInit(): void {
    this.getDates(2);
  }

  ngOnDestroy(): void {
    this.subSidenav.unsubscribe();
  }

  getDates(timezone: number): void{
    this.service.getWeatherDates(timezone).subscribe(
      data => this.dates = data,
      error => console.log(error)
    );
  }
}
