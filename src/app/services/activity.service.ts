import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {BikeData} from '../models/bikeData.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private host = 'http://localhost:8080';
  private url = this.host + '/v3/activities';

  constructor(private httpClient: HttpClient) { }

// get all bikes
  getData(bike: string, startTime: string, endTime: string, deviceType: string, run: boolean): Observable<Array<BikeData>> {
    let params = new HttpParams();
    params = params.append('bike', bike);
    params = params.append('startTime', startTime);
    params = params.append('endTime', endTime);
    params = params.append('deviceType', deviceType);
    params = params.append('run', String(run));
    return this.httpClient.get<Array<BikeData>>(this.url, { params })
      .pipe(
        map(s => s.map(s2 =>
          new BikeData(s2.bikeName, s2.timestamp, s2.deviceType, s2.speed, s2.time, s2.speedGps, s2.distance, s2.gear, s2.power,
            s2.heartrate, s2.cadence, s2.run, s2.temperature, s2.humidity, s2.pressure, s2.altitude, s2.latitude, s2.longitude))),
        catchError(err => {
          console.error(err);
          return throwError('ActivityService getData error: ' + err.message);
        })
      );
  }
}
