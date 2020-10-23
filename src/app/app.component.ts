import { Component } from '@angular/core';
import {NavModel} from './models/NavModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PolicumbentUI';
  links: Array<NavModel> = [
    new NavModel('./bikes', 'Bikes'),
    new NavModel('./weather', 'Weather Station')
  ];
}
