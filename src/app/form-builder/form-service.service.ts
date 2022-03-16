import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormServiceService {
  endPoint = environment.dev_url;
  constructor(private http: HttpClient) {}
  getControlsFromDb() {
    return this.http.get(`${this.endPoint}formControls`);
  }
  saveFormsInLocalDb(data: any) {
    return this.http.post(`${this.endPoint}forms`, data);
  }
  getAllForms() {
    return this.http.get(`${this.endPoint}forms`);
  }
  deleteForm(id: any) {
    return this.http.delete(`${this.endPoint}forms/${id}`);
  }
  getFormWithId(id: any) {
    return this.http.get(`${this.endPoint}forms/${id}`);
  }
  updateFormInLocalDb(id: any, data: any) {
    return this.http.put(`${this.endPoint}forms/${id}`, { ...data });
  }
}
