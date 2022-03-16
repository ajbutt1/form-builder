import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormServiceService {
  constructor(private http: HttpClient) {}
  getControlsFromDb() {
    return this.http.get('http://localhost:3000/formControls');
  }
  saveFormsInLocalDb(data: any) {
    return this.http.post('http://localhost:3000/forms', data);
  }
  getAllForms() {
    return this.http.get('http://localhost:3000/forms');
  }
  deleteForm(id: any) {
    return this.http.delete(`http://localhost:3000/forms/${id}`);
  }
  getFormWithId(id: any) {
    return this.http.get(`http://localhost:3000/forms/${id}`);
  }
  updateFormInLocalDb(id: any, data: any) {
    return this.http.put(`http://localhost:3000/forms/${id}`, { ...data });
  }
}
