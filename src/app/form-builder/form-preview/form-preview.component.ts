import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.css'],
})
export class FormPreviewComponent implements OnInit {
  controls: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<FormPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    //dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.controls = this.data.controls;
  }
}
