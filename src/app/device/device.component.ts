import { Component, OnInit } from '@angular/core';
import {BikeService} from '../services/bike.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  deviceName: string;

  constructor(
    private bikeService: BikeService,
    private route: ActivatedRoute
  ) {
    this.deviceName = this.route.snapshot.params.device;
    this.route.params.subscribe(p => this.deviceName = p.device);
  }

  ngOnInit(): void {
  }

}
