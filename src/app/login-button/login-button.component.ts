import {Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent implements OnInit {
  loginButtonState: string;


  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.isLogged() ? this.loginButtonState = 'Logout' : this.loginButtonState = 'Login';
  }

  // in base al fatto che sia loggato o meno cambio i parametri nell'indirizzo
  getQueryParams(): any {
    return this.authService.isLogged() ? {doLogin: 'false'} : {doLogin: 'true'};
  }

  // imposto il parametro per fare la registrazione
  getQueryParamsReg(): any {
    return {doReg: 'true'};
  }

  // alla pressione del tasto di login se sono loggato effettuo il logout o vicevera
  // nel caso di login apro un dialog e alla sua chiusura se è andato a buon fine aggiorno la pagina
  // questo mi permetterà di caricare il welcome component ed essere indirizzato alla pagina con il ruolo corretto
  openDialog(): void {
    if (!this.authService.isLogged()) {
      const dialogRef = this.dialog.open(LoginDialogComponent);
      dialogRef.afterClosed().subscribe(() => {
        this.authService.isLogged() ? this.loginButtonState = 'Logout' : this.loginButtonState = 'Login';
        this.router.navigate(['/']);
      });
    } else {
      this.authService.removeJwt();
      this.loginButtonState = 'Login';
      this.router.navigate(['/']);
    }
  }


}
