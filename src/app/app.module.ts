import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {BikesComponent} from './bikes/bikes.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { InfoBikeComponent } from './info-bike/info-bike.component';
import { ActivityComponent } from './activity/activity.component';
import { WeatherComponent } from './weather/weather.component';
import { ChartComponent } from './chart/chart.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DayDataComponent } from './day-data/day-data.component';
import { DeviceComponent } from './device/device.component';
import { ChartsComponent } from './charts/charts.component';


@NgModule({
  declarations: [
    AppComponent,
    BikesComponent,
    WelcomeComponent,
    InfoBikeComponent,
    ActivityComponent,
    WeatherComponent,
    ChartComponent,
    StatisticsComponent,
    DayDataComponent,
    DeviceComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
