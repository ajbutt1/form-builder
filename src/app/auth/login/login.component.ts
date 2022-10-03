import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({});
  constructor(
    private auth: AuthService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}
  loginFormJson: any;
  createForm(controls: any) {
    for (let control of controls) {
      const validatorsArray = [];
      if (
        control.type !== 'email' &&
        control.type !== 'button' &&
        control.type !== 'submit'
      ) {
        for (let [key, value] of Object.entries(control.validators)) {
          switch (key) {
            case 'minLength':
              validatorsArray.push(
                Validators.minLength(value as unknown as number)
              );
              break;
            case 'maxLength':
              validatorsArray.push(
                Validators.maxLength(value as unknown as number)
              );
              break;
            default:
              break;
          }
        }
      }
      this.loginForm.addControl(
        control.name,
        this.fb.control(control.value, validatorsArray)
      );
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }
  ngOnInit(): void {
    this.auth.getForms().subscribe((response: any) => {
      if (response.length > 0) {
        this.loginFormJson = response.filter(
          (data: any) => data.fileType === 'login'
        );
        if (this.loginFormJson) {
          this.createForm(this.loginFormJson[0].controls);
        }
        this.loginFormJson =
          this.loginFormJson.length === 0 ? null : this.loginFormJson;
        console.log(this.loginFormJson);
      }
    });
  }
  handleLogin() {
    this.auth.getAllUser().subscribe((allUser: any) => {
      const isUserPresent = allUser.filter(
        (user: any) => user.email === this.loginForm.value.email
      )[0];
      if (isUserPresent) {
        this.openSnackBar('login successfully', 'ok');
      } else {
        this.openSnackBar('Invalid user', 'ok');
      }
    });
  }
}
