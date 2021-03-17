import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavModel} from './models/NavModel';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from './services/auth.service';
import {Subscription} from 'rxjs';
import {LoginDialogComponent} from './login-dialog/login-dialog.component';
import {LoginButtonComponent} from './login-button/login-button.component';
import {SidenavService} from './services/sidenav.service';
import {MessagingService} from './services/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'PolicumbentUI';
  sidenavState = false;
  links: Array<NavModel> = [
    new NavModel('./bikes', 'Bikes'),
    new NavModel('./alice', 'Alice'),
    new NavModel('./weather', 'Weather Station')
  ];
  doLogin: Subscription;
  child: Subscription;
  @ViewChild(LoginButtonComponent)
  loginDialog: LoginButtonComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private sidenavService: SidenavService,
    private messagingService: MessagingService
  ) {
    this.doLogin = route.queryParams.subscribe(
      q =>
        (q.doLogin === 'true' && !authService.isLogged()) || (q.doLogin === 'false' && authService.isLogged()) ?
          this.loginDialog.openDialog() : q);
  }

  ngOnInit(): void {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    }

  changeSidenavState(): void{
    this.sidenavService.changeSidenavState(this.sidenavState);
    this.sidenavState = !this.sidenavState;
  }

  ngOnDestroy(): void {
    this.doLogin.unsubscribe();
    this.child.unsubscribe();
  }

  isOnBikePage(): boolean {
    return true;
  }
}
