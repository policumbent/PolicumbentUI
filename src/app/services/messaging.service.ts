import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private httpClient: HttpClient
  ) {
    this.angularFireMessaging.messages.subscribe(
      (messaging: AngularFireMessaging) => {
        messaging.onMessage = messaging.onMessage.bind(messaging);
        messaging.onTokenRefresh = messaging.onTokenRefresh.bind(messaging);
      }
    );
  }
  requestPermission(): void {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        this.saveToken(token).subscribe(v => console.log(v));
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }
  receiveMessage(): void {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log('new message received. ', payload);
        this.currentMessage.next(payload);
      });
  }

  // save notification token
  saveToken(token: string): Observable<any> {
    const v = {token, lang: this.get_language_id()};
    return this.httpClient.put<any>(`https://policumbent-2021-default-rtdb.firebaseio.com/notifications/ui/${token}.json`, v)
      .pipe(
        catchError(err => {
          console.error(err);
          return throwError('NotificationService saveToken error: ' + err.message);
        })
      );
  }

  get_language_id(): string {
    const userLang = navigator.language;
    if (userLang.includes('it')) {
      return 'it';
    }
    return 'en';
  }

}
