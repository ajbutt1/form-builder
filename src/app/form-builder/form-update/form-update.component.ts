import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-update',
  templateUrl: './form-update.component.html',
  styleUrls: ['./form-update.component.css'],
})
export class FormUpdateComponent implements OnInit {
  editBtnModeOn = false;
  formUpdate = this.fb.group({});
  minMaxLengthError = false;
  constructor(
    public dialogRef: MatDialogRef<FormUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    dialogRef.disableClose = true;
  }
  addControlInForm(controlName: any, value: any) {
    this.formUpdate.addControl(controlName, this.fb.control(value));
  }
  ngOnInit(): void {
    const item = this.data.item;
    this.editBtnModeOn = false;

    if (this.data.item.validators) {
      this.addControlInForm('name', item.name);
      this.addControlInForm('label', item.label);
      this.formUpdate.addControl(
        'validators',
        this.fb.group({
          minLength: [this.data.item.validators.minLength],
          maxLength: [this.data.item.validators.maxLength],
          required: [this.data.item.validators.required],
        })
      );
    } else if (item.type === 'button' || item.type === 'submit') {
      this.addControlInForm('buttonValue', item.value);
      this.editBtnModeOn = true;
    }
  }
  getEditItemIndex() {
    return this.data.controls.findIndex((c: any) => c.id === this.data.item.id);
  }

  updateFiedWithIndex() {
    const editIndex = this.getEditItemIndex();
    this.data.controls[editIndex] = {
      ...this.formUpdate.value,
      id: new Date().getTime(),
      type: this.data.item.type,
      value: '',
    };
    this.handleClose();
  }
  updateButtonFieldWithIndex() {
    const editIndex = this.getEditItemIndex();
    this.data.controls[editIndex] = {
      id: new Date().getTime(),
      type: this.data.item.type,
      value: this.formUpdate.value.buttonValue,
      name: this.data.item.name,
      label: this.data.item.label,
    };
    this.handleClose();
  }
  handleFieldUpdate() {
    this.minMaxLengthError = false;
    if (this.formUpdate.valid) {
      // check if validator present then text case other wise btn case
      if (this.formUpdate.value.validators) {
        const { minLength, maxLength } = this.formUpdate.value.validators;
        // email updation case
        if (this.data.item.type === 'email') {
          this.updateFiedWithIndex();
        } else {
          // Text ,password ,number, phone number
          if (minLength > 0 && maxLength > 0 && minLength <= maxLength) {
            this.updateFiedWithIndex();
          } else {
            this.minMaxLengthError = true;
            console.log(minLength, maxLength);
          }
        }
      } else if (this.editBtnModeOn) {
        // button update
        this.updateButtonFieldWithIndex();
      }
    }
  }

  handleClose() {
    this.dialogRef.close({
      event: 'close',
      data: this.data.controls,
      modalType: 'update',
    });
  }
}
