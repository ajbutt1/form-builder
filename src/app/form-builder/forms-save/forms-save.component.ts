import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, of } from 'rxjs';

import { FormServiceService } from '../form-service.service';

@Component({
  selector: 'app-forms-save',
  templateUrl: './forms-save.component.html',
  styleUrls: ['./forms-save.component.css'],
})
export class FormsSaveComponent implements OnInit {
  saveForm = this.fb.group({
    fileName: [''],
    fileType: [''],
  });
  isFormAlreadyPresent = false;
  idForIsFormAlreadyPresent: any;
  constructor(
    public dialogRef: MatDialogRef<FormsSaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private formService: FormServiceService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    if (this.data.isUpdateModeOn) {
      this.saveForm.patchValue({
        fileName: this.data.fileName,
        fileType: this.data.fileType,
      });
    }
    this.saveForm.valueChanges.subscribe((response) => {
      if (this.isFormAlreadyPresent) {
        this.isFormAlreadyPresent = false;
        this.data.id = null;
      }
    });
  }

  updateData(data: any) {
    this.formService
      .updateFormInLocalDb(this.data.id, data)
      .pipe(catchError((err) => of(err)))
      .subscribe(() => {
        this.dialogRef.close({
          event: 'close',
          data: [],
          modalType: 'update',
        });
      });
  }

  checkFormAlreadyPresent(data: any) {
    this.formService.getAllForms().subscribe((forms: any) => {
      const isFormPresent = forms.filter(
        (f: any) => f.fileType === data.fileType
      );
      if (!isFormPresent[0]) {
        this.formService
          .saveFormsInLocalDb(data)
          .pipe(catchError((err) => of(err)))
          .subscribe(() => {
            this.dialogRef.close({
              event: 'close',
              data: [],
              modalType: 'create',
            });
          });
      } else {
        this.isFormAlreadyPresent = true;
        this.data.id = isFormPresent[0].id;
        this.idForIsFormAlreadyPresent = isFormPresent;
      }
    });
  }

  handleSaveForm() {
    if (this.saveForm.valid) {
      this.isFormAlreadyPresent = false;
      this.idForIsFormAlreadyPresent = null;
      const data = {
        id: new Date().getTime(),
        fileName: this.saveForm.value.fileName,
        fileType: this.saveForm.value.fileType,
        controls: this.data.controls,
      };

      this.checkFormAlreadyPresent(data);
    }
  }
  handleOverview() {
    const data = {
      id: new Date().getTime(),
      fileName: this.saveForm.value.fileName,
      fileType: this.saveForm.value.fileType,
      controls: this.data.controls,
    };
    this.updateData(data);
  }
}
