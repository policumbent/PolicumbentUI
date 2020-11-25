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
import { LoginButtonComponent } from './login-button/login-button.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {JwtInterceptor} from './services/JwtInterceptor';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { StatisticsTableComponent } from './statistics-table/statistics-table.component';
import {GoogleChartsModule} from 'angular-google-charts';
import { UploadComponent } from './upload/upload.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatProgressBarModule } from '@angular/material/progress-bar';


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
    ChartsComponent,
    LoginButtonComponent,
    LoginDialogComponent,
    StatisticsTableComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    NgxSliderModule,
    GoogleChartsModule,
    MatDatepickerModule,
    MaterialFileInputModule,
    MatProgressBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {duration: 2500}
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
