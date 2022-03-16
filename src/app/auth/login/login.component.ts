import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService) {}
  loginFormJson = null;
  ngOnInit(): void {
    this.auth.getForms().subscribe((response: any) => {
      if (response.length > 0) {
        this.loginFormJson = response.filter(
          (data: any) => data.fileType === 'login'
        );
        console.log(this.loginFormJson);
      } else {
        console.log('no');
      }
    });
  }
}
