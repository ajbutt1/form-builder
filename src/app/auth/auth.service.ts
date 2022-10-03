import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endPoint = environment.dev_url;
  constructor(private http: HttpClient) {}
  getForms() {
    return this.http.get(this.endPoint + 'forms');
  }
  register(data: any) {
    data = { ...data, id: new Date().getTime() };
    return this.http.post(`${this.endPoint}auth`, data);
  }
  getAllUser() {
    return this.http.get(`${this.endPoint}auth`);
  }
}
