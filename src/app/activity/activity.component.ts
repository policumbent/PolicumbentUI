import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavModel} from '../models/NavModel';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSelectChange} from '@angular/material/select';
import {ActivityService} from '../services/activity.service';
import {number} from '@amcharts/amcharts4/core';
import {MatSidenav} from '@angular/material/sidenav';
import {SidenavService} from '../services/sidenav.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnDestroy, OnInit {
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
    private service: ActivityService,
    private sidenavService: SidenavService) {
    console.log(route.snapshot.firstChild.params);
    this.sub = router.events.subscribe( data => {
      if (route.snapshot.firstChild.firstChild !== null) {
        this.device = route.snapshot.firstChild.firstChild.params.device;
        this.bikeName = route.snapshot.params.bikeName;
        this.getDates(this.bikeName, this.device, 2);
      }
    });
    this.subSidenav = sidenavService.getMessage().subscribe(data => data.open ? this.sidenav.open() : this.sidenav.close());
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subSidenav.unsubscribe();
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
