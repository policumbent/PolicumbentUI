import {Component, OnDestroy, ViewChild} from '@angular/core';
import {NavModel} from './models/NavModel';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from './services/auth.service';
import {Subscription} from 'rxjs';
import {LoginDialogComponent} from './login-dialog/login-dialog.component';
import {LoginButtonComponent} from './login-button/login-button.component';
import {SidenavService} from './services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'PolicumbentUI';
  sidenavState = false;
  links: Array<NavModel> = [
    new NavModel('./bikes', 'Bikes'),
    new NavModel('./weather', 'Weather Station')
  ];
  doLogin: Subscription;
  @ViewChild(LoginButtonComponent)
  loginDialog: LoginButtonComponent;

  constructor(
    route: ActivatedRoute,
    private authService: AuthService,
    private sidenavService: SidenavService) {
    this.doLogin = route.queryParams.subscribe(
      q =>
        (q.doLogin === 'true' && !authService.isLogged()) || (q.doLogin === 'false' && authService.isLogged()) ?
          this.loginDialog.openDialog() : q);
  }

  changeSidenavState(): void{
    this.sidenavService.changeSidenavState(this.sidenavState);
    this.sidenavState = !this.sidenavState;
  }

  ngOnDestroy(): void {
    this.doLogin.unsubscribe();
  }
}
