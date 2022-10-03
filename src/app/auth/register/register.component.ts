import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({});
  constructor(
    private auth: AuthService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router
  ) {}
  registerFormJson: any;
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

      this.registerForm.addControl(
        control.name,
        this.fb.control(control.value, validatorsArray)
      );
    }
  }
  ngOnInit(): void {
    this.auth.getForms().subscribe((response: any) => {
      if (response.length > 0) {
        this.registerFormJson = response.filter(
          (data: any) => data.fileType === 'register'
        );
        if (this.registerFormJson.length !== 0) {
          this.createForm(this.registerFormJson[0].controls);
        }
        this.registerFormJson =
          this.registerFormJson.length === 0 ? null : this.registerFormJson;
      }
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }
  handleRegister() {
    if (this.registerForm.valid) {
      this.auth.getAllUser().subscribe((allUser: any) => {
        const isUserPresent = allUser.filter(
          (user: any) => user.email === this.registerForm.value.email
        )[0];
        if (isUserPresent) {
          this.auth.register(this.registerForm.value).subscribe((response) => {
            console.log('register successfully');
            this.openSnackBar('Register successfully', 'ok');
          });
        } else {
          this.openSnackBar('User already register', 'ok');
          this.router.navigate(['login']);
        }
      });
    }
  }
}
