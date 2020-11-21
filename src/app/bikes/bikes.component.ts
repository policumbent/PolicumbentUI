import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatSelectChange} from '@angular/material/select';
import {Bike} from '../models/bike.model';
import {BikeService} from '../services/bike.service';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.css']
})
export class BikesComponent implements OnInit, OnDestroy {
  bikeName: string;
  sub: Subscription;
  bikes: Bike[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bikeService: BikeService) {
    this.bikeName = route.snapshot.firstChild.params.bikeName;
    console.log(this.bikeName);
    this.sub = route.firstChild.params.subscribe( data => this.bikeName = data.bikeName);
  }

  ngOnInit(): void {
    this.bikeService.getAllBikes().subscribe(data => this.bikes = data);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  bikeSelection(event: MatSelectChange): void {
    console.log(event.value);
    this.router.navigate(
      [`/bikes/${event.value}`]);
  }
}
