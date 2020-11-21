import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  usernameValidator;
  passwordValidator;
  labelValue: string;
  constructor(private service: AuthService, private dialogRef: MatDialogRef<LoginDialogComponent>) {
    this.usernameValidator = new FormControl('', [Validators.required, Validators.maxLength(255)]);
    this.passwordValidator = new FormControl('', [Validators.required, Validators.maxLength(255)]);

  }

  getUsernameErrorMessage(): string {
    if (this.usernameValidator.hasError('required')) {
      return 'You must enter a value';
    }
    return this.usernameValidator.hasError('email') || this.usernameValidator.hasError('maxLength') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage(): string {
    if (this.passwordValidator.hasError('required')) {
      return 'You must enter a value';
    }
    return this.passwordValidator.hasError('maxLength') ? 'Not a valid email' : '';
  }

  login(): void{
    this.service.login(this.usernameValidator.value, this.passwordValidator.value)
      .subscribe(
        data => {
          this.service.setJwt(data.token);
          this.dialogRef.close();
        },
        error => error.status === 400 ?
          this.labelValue = 'Username or password not valid' : this.labelValue = 'An error has occurred'
      );
  }

}
