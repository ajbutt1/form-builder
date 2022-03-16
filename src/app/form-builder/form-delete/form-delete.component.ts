import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormServiceService } from '../form-service.service';
@Component({
  selector: 'app-form-delete',
  templateUrl: './form-delete.component.html',
  styleUrls: ['./form-delete.component.css'],
})
export class FormDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<FormDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formService: FormServiceService,
    private _snackBar: MatSnackBar
  ) {
    dialogRef.disableClose = true;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  handleDeleteField() {
    if (this.data.deleteFrom === 'table') {
      this.formService.deleteForm(this.data.id).subscribe(() => {
        this.openSnackBar('Form deleted successfully!', 'Ok');
        this.dialogRef.close({ event: 'close' });
      });
    } else {
      this.data.controls = this.data.controls.filter(
        (c: any) => c.id !== this.data.id
      );
      const data = {
        controls: this.data.controls,
        modalType: 'delete',
      };
      this.openSnackBar('Field deleted successfully!', 'Ok');
      this.dialogRef.close({ event: 'close', data });
    }
  }
}
