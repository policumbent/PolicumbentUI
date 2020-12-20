import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Bike} from '../models/bike.model';
import {catchError, map} from 'rxjs/operators';
import {WeatherStation} from '../models/weatherStation.model';
import {WeatherData} from '../models/weatherData.model';
import {BikeData} from '../models/bikeData.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private host = 'https://poliserver.duckdns.org:9002';
  // private host = 'http://localhost:8080';
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
          return throwError('WeatherService getLastData error: ' + err.message);
        })
      );
  }

  getWeatherDates(timeZone: number = 2): Observable<Array<string>>{
    let params = new HttpParams();
    params = params.append('timeZone', String(timeZone));
    return this.httpClient.get<Array<string>>(`${this.url}/dates`, { params })
      .pipe(
        catchError(err => {
          console.error(err);
          return throwError('WeatherService getWeatherDates error: ' + err.message);
        })
      );
  }

  getData(startTime: string, endTime: string): Observable<Array<WeatherData>> {
    let params = new HttpParams();
    params = params.append('t0', startTime);
    params = params.append('t1', endTime);
    return this.httpClient.get<Array<WeatherData>>(this.url, { params })
      .pipe(
        map(s => s.map(s2 =>
          new WeatherData(s2.stationId, s2.windSpeed, s2.windDirection, s2.timestamp,
            s2.temperature, s2.humidity, s2.latitude, s2.longitude, s2.pressure))),
        catchError(err => {
          console.error(err);
          return throwError('WeatherService getData error: ' + err.message);
        })
      );
  }

}
