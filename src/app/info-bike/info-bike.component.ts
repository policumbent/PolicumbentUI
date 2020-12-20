import { Component, OnInit } from '@angular/core';
import {BikeService} from '../services/bike.service';
import {Bike} from '../models/bike.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {WeatherService} from '../services/weather.service';
import {WeatherStation} from '../models/weatherStation.model';

@Component({
  selector: 'app-info-bike',
  templateUrl: './info-bike.component.html',
  styleUrls: ['./info-bike.component.css']
})
export class InfoBikeComponent implements OnInit {
  // ws: WeatherStation;


  constructor(
    // private service: WeatherService,
    // private snackBar: MatSnackBar,
    // private route: ActivatedRoute
    ) {
    // this.ws = new WeatherStation(0, '');
    // const bikeName = this.route.snapshot.params.bikeName;
    // this.route.params.subscribe(p => this.getBike(p.bikeName));
    // this.getBike(bikeName);
  }

  ngOnInit(): void {
  }

//   getBike(bikeName: string): void {
//     this.bikeService.getBike(bikeName)
//       .subscribe(
//         b => this.bike = b,
//         e => {
//           console.log(e);
//           this.snackBar.open('Errore nel recuperare le informazioni sulla bici', 'Chiudi');
//         }
//       );
// }

}
