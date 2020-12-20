import { Component, OnInit } from '@angular/core';
import {BikeService} from '../services/bike.service';
import {Bike} from '../models/bike.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-info-bike',
  templateUrl: './info-bike.component.html',
  styleUrls: ['./info-bike.component.css']
})
export class InfoBikeComponent implements OnInit {
  bike: Bike;


  constructor(
    private bikeService: BikeService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.bike = new Bike('', '', false);
    const bikeName = this.route.snapshot.params.bikeName;
    this.route.params.subscribe(p => this.getBike(p.bikeName));
    this.getBike(bikeName);
  }

  ngOnInit(): void {
  }

  getBike(bikeName: string): void {
    this.bikeService.getBike(bikeName)
      .subscribe(
        b => this.bike = b,
        e => {
          console.log(e);
          this.snackBar.open('Errore nel recuperare le informazioni sulla bici', 'Chiudi');
        }
      );
  }

}
