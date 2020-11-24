import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {BikeData} from '../models/bikeData.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private host = 'https://poliserver.duckdns.org:9002';
  private url = this.host + '/v3/activities';

  constructor(private httpClient: HttpClient) { }

// get all bikes
  getData(bike: string, startTime: string, endTime: string, deviceType: number): Observable<Array<BikeData>> {
    let params = new HttpParams();
    params = params.append('bike', bike);
    params = params.append('startTime', startTime);
    params = params.append('endTime', endTime);
    params = params.append('deviceType', String(deviceType));
    return this.httpClient.get<Array<BikeData>>(this.url, { params })
      .pipe(
        map(s => s.map(s2 =>
          new BikeData(s2.deviceType, s2.deviceTypeInt, s2.bikeName, s2.timeStr, s2.time, s2.cpuTemp, s2.timestamp, s2.speedGps,
            s2.latitude, s2.longitude, s2.altitude, s2.power, s2.speed, s2.distance, s2.heartrate, s2.cadence, s2.gear, s2.targetSpeed,
            s2.targetPower, s2.temperature, s2.humidity, s2.pressure, s2.accX, s2.accY, s2.accZ, s2.accXMax, s2.accYMax, s2.accZMax))),
        catchError(err => {
          console.error(err);
          return throwError('ActivityService getData error: ' + err.message);
        })
      );
  }

  getDates(bikeName: string, deviceType: number, timeZone: number = 2): Observable<Array<string>>{
    let params = new HttpParams();
    params = params.append('timeZone', String(timeZone));
    return this.httpClient.get<Array<string>>(`${this.url}/${bikeName}/dates/${deviceType}`, { params })
      .pipe(
        catchError(err => {
          console.error(err);
          return throwError('ActivityService getDates error: ' + err.message);
        })
      );
  }

  getDeviceInt(deviceName: string): number{
    switch (deviceName) {
      case 'bike':
        return  0;
      case 'garmin':
        return  1;
      case 'marta':
        return 2;
      default:
        return -1;
    }
  }
}
