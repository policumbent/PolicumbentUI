import { Component, OnInit } from '@angular/core';
import {NavModel} from '../models/NavModel';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  dates: string[] = ['10-10-20', '15-12-19', '16-12-19', '17-12-19'];
  device: string;
  sub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {
    if (route.snapshot.firstChild !== null){
      this.device = route.snapshot.firstChild.params.device;
      console.log(this.device);
      this.sub = route.firstChild.params.subscribe( data => this.device = data.device);
    }
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
}
