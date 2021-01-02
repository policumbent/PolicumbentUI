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
import {AuthGuard} from './services/auth.guard';
import {UploadComponent} from './upload/upload.component';
import {WorkInProgressComponent} from './work-in-progress/work-in-progress.component';
import {WeatherDetailsComponent} from './weather-details/weather-details.component';
import {WeatherChartsComponent} from './weather-charts/weather-charts.component';
import {AliceComponent} from './alice/alice.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent },
  {path: 'alice',
    canActivate: [AuthGuard],
    component: AliceComponent },
  {path: 'bikes',
    canActivate: [AuthGuard],
    children: [
      {path: '', component: BikesComponent, children: [
          {path: '', component: WelcomeComponent },
          {path: ':bikeName', component: InfoBikeComponent}
        ]},
      {path: ':bikeName/activity', component: ActivityComponent, children: [
          {path: '', component: InfoBikeComponent},
          {path: ':device', children: [
              {path: '',  component: DeviceComponent},
              {path: ':date', component: DayDataComponent, children: [
                  {path: 'chart', component: ChartComponent},
                  {path: 'charts', component: ChartsComponent},
                  {path: 'statistics', component: StatisticsComponent}
                ] },
            ]},

        ]},
      {path: ':bikeName/upload', component: UploadComponent }
    ]},
  // {path: 'weather', canActivate: [AuthGuard], component: WeatherComponent },
  {path: 'weather',
    canActivate: [AuthGuard],
    component: WeatherDetailsComponent, children: [
      {path: '', component: WeatherComponent},
      {path: ':date', component: DayDataComponent, children: [
          // {path: 'chart', component: ChartComponent},
          {path: '', component: StatisticsComponent},
          {path: 'charts', component: WeatherChartsComponent},
          {path: 'statistics', component: WorkInProgressComponent}
        ] },
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
