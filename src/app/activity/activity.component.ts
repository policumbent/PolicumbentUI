import { Component, OnInit } from '@angular/core';
import {NavModel} from '../models/NavModel';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSelectChange} from '@angular/material/select';
import {ActivityService} from '../services/activity.service';
import {number} from '@amcharts/amcharts4/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  dates: string[] = [];
  device: string;
  bikeName: string;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ActivityService) {
    console.log(route.snapshot.firstChild.params);
    this.sub = router.events.subscribe( data => {
      if (route.snapshot.firstChild.firstChild !== null) {
        this.device = route.snapshot.firstChild.firstChild.params.device;
        this.bikeName = route.snapshot.params.bikeName;
        this.getDates(this.bikeName, this.device, 2);
      }
    });
  }

  ngOnInit(): void {
  }

  deviceSelection(event: MatSelectChange): void {
    const bike = this.route.snapshot.params.bikeName;
    console.log(this.route.snapshot);
    console.log(event.value);
    this.router.navigate(
      [`/bikes/${bike}/activity/${event.value}`]);
  }

  getDates(bikeName: string, device: string, timezone: number): void{
    const deviceInt = this.service.getDeviceInt(device);
    this.service.getDates(bikeName, deviceInt, timezone).subscribe(
      data => this.dates = data,
      error => console.log(error)
    );
  }
}
