import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.css']
})
export class BikesComponent implements OnInit, OnDestroy {
  bikeName: string;
  sub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.bikeName = route.snapshot.firstChild.params.bikeName;
    console.log(this.bikeName);
    this.sub = route.firstChild.params.subscribe( data => this.bikeName = data.bikeName);
  }

  ngOnInit(): void {
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
