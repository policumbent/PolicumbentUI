import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {BikesComponent} from './bikes/bikes.component';
import {InfoBikeComponent} from './info-bike/info-bike.component';
import {ActivityComponent} from './activity/activity.component';
import {WeatherComponent} from './weather/weather.component';
import {ChartComponent} from './chart/chart.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {DayDataComponent} from './day-data/day-data.component';
import {DeviceComponent} from './device/device.component';
import {ChartsComponent} from './charts/charts.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent },
  {path: 'bikes',
    children: [
      {path: '', component: BikesComponent, children: [
          {path: '', component: WelcomeComponent },
          {path: ':bikeName', component: InfoBikeComponent}
        ]},
      {path: ':bikeName/activity', component: ActivityComponent, children: [
          {path: ':device', children: [
              {path: '',  component: DeviceComponent},
              {path: ':date', component: DayDataComponent, children: [
                  {path: 'chart', component: ChartComponent},
                  {path: 'charts', component: ChartsComponent},
                  {path: 'statistics', component: StatisticsComponent}
                ] },
            ]},

        ]}
    ]},
  {path: 'weather', component: WeatherComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
