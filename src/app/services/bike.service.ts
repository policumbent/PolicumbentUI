import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Bike} from '../models/bike.model';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private host = 'http://localhost:8080';
  private url = this.host + '/v3/bikes';

  constructor(private httpClient: HttpClient) { }

// get all bikes
  getAllBikes(): Observable<Array<Bike>> {
    return this.httpClient.get<Array<Bike>>(this.url)
      .pipe(
        map(s => s.map(s2 => new Bike(s2.name, s2.driver, s2.enabled))),
        catchError(err => {
          console.error(err);
          return throwError('BikeService getAllBikes error: ' + err.message);
        })
      );
  }

  // get bike
  getBike(bikeName): Observable<Bike> {
    return this.httpClient.get<Bike>(`${this.url}/${bikeName}`)
      .pipe(
        map(s2 => new Bike(s2.name, s2.driver, s2.enabled)),
        catchError(err => {
          console.error(err);
          return throwError('BikeService getBike error: ' + err.message);
        })
      );
  }
}
