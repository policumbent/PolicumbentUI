import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Bike} from '../models/bike.model';
import {catchError, map} from 'rxjs/operators';
import {AliceComment} from '../models/aliceComment.model';
import {AliceConfig} from '../models/aliceConfig.model';
import {AliceNotification} from '../models/aliceNotification.model';

@Injectable({
  providedIn: 'root'
})
export class AliceService {
  private host = 'https://poliserver.duckdns.org:9002';
  private url = this.host + '/v3/alice';

  constructor(private httpClient: HttpClient) { }

// get alice config
  getConfig(): Observable<AliceConfig> {
    return this.httpClient.get<AliceConfig>(`${this.url}/config`)
      .pipe(
        map(s2 => new AliceConfig(s2.bikeName, s2.trackName, s2.date, s2.startTime)),
        catchError(err => {
          console.error(err);
          return throwError('AliceService getConfig error: ' + err.message);
        })
      );
  }
// save alice config
  saveConfig(config: AliceConfig): Observable<AliceConfig> {
    return this.httpClient.post<AliceConfig>(`${this.url}/config`, config)
      .pipe(
        catchError(err => {
          console.error(err);
          return throwError('AliceService saveConfig error: ' + err.message);
        })
      );
  }

  // get alice comments
  getComments(): Observable<Array<AliceComment>> {
    return this.httpClient.get<Array<AliceComment>>(`${this.url}/comments`)
      .pipe(
        map(s => s.map(s2 => new AliceComment(s2.message, s2.timestamp, s2.username, s2.id))),
        catchError(err => {
          console.error(err);
          return throwError('AliceService getComments error: ' + err.message);
        })
      );
  }
// add alice comment
  addComment(comment: AliceComment): Observable<AliceComment> {
    return this.httpClient.post<AliceComment>(`${this.url}/comments`, comment)
      .pipe(
        catchError(err => {
          console.error(err);
          return throwError('AliceService addComment error: ' + err.message);
        })
      );
  }

  // delete alice comment
  deleteComment(comment: AliceComment): Observable<AliceComment> {
    return this.httpClient.delete<AliceComment>(`${this.url}/comments/${comment.id}`)
      .pipe(
        catchError(err => {
          console.error(err);
          return throwError('AliceService deleteComment error: ' + err.message);
        })
      );
  }
  // get alice notifications
  getNotifications(): Observable<Array<AliceNotification>> {
    let params = new HttpParams();
    params = params.append('all', 'true');
    return this.httpClient.get<Array<AliceNotification>>(`${this.url}/notifications`, { params })
      .pipe(
        map(s => s.map(s2 => new AliceNotification(s2.message, s2.timestamp, s2.public, s2.id))),
        catchError(err => {
          console.error(err);
          return throwError('AliceService getNotifications error: ' + err.message);
        })
      );
  }
}
