import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatSelectChange} from '@angular/material/select';
import {Bike} from '../models/bike.model';
import {BikeService} from '../services/bike.service';
import {SidenavService} from '../services/sidenav.service';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.css']
})
export class BikesComponent implements OnInit, OnDestroy {
  bikeName: string;
  sub: Subscription;
  subSidenav: Subscription;
  bikes: Bike[];

  @ViewChild(MatSidenav)
  sidenav: MatSidenav;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bikeService: BikeService,
    private sidenavService: SidenavService) {
    this.bikeName = route.snapshot.firstChild.params.bikeName;
    console.log(this.bikeName);
    this.sub = route.firstChild.params.subscribe( data => this.bikeName = data.bikeName);
    this.subSidenav = sidenavService.getMessage().subscribe(data => data.open ? this.sidenav.open() : this.sidenav.close());
  }

  ngOnInit(): void {
    this.bikeService.getAllBikes().subscribe(data => this.bikes = data);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.subSidenav.unsubscribe();
  }

  bikeSelection(event: MatSelectChange): void {
    console.log(event.value);
    this.router.navigate(
      [`/bikes/${event.value}`]);
  }
}
