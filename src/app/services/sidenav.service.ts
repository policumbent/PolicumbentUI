import {Injectable} from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidenavService {
  private subject = new Subject<any>();
  changeSidenavState(open: boolean): void {
    this.subject.next({ open });
  }
  //
  // clearMessages(): void {
  //   this.subject.next();
  // }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
