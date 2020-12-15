import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Bike} from '../models/bike.model';
import {catchError, map} from 'rxjs/operators';
import {WeatherStation} from '../models/weatherStation.model';
import {WeatherData} from '../models/weatherData.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private host = 'https://poliserver.duckdns.org:9002';
  private url = this.host + '/v3/weather';

  constructor(private httpClient: HttpClient) { }

// get all stations
  getAllStations(): Observable<Array<WeatherStation>> {
    return this.httpClient.get<Array<WeatherStation>>(`${this.url}/stations`)
      .pipe(
        map(s => s.map(s2 => new WeatherStation(s2.id, s2.description))),
        catchError(err => {
          console.error(err);
          return throwError('WeatherService getAllStations error: ' + err.message);
        })
      );
  }

// get last data
  getLastData(): Observable<Array<WeatherData>> {
    return this.httpClient.get<Array<WeatherData>>(`${this.url}/last`)
      .pipe(
        map(s => s.map(s2 =>
          new WeatherData(s2.stationId, s2.windSpeed, s2.windDirection,
            s2.timestamp, s2.temperature, s2.humidity, s2.latitude,
            s2.longitude, s2.pressure)
        )),
        catchError(err => {
          console.error(err);
          return throwError('WeatherData getLastData error: ' + err.message);
        })
      );
  }
}
