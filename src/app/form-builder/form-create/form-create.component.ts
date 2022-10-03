import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormServiceService } from '../form-service.service';
import { FormDeleteComponent } from '../form-delete/form-delete.component';
import { FormUpdateComponent } from '../form-update/form-update.component';
import { FormPreviewComponent } from '../form-preview/form-preview.component';
import { FormsSaveComponent } from '../forms-save/forms-save.component';

interface data {
  controls: any;
  isUpdateModeOn: any;
  id: any;
  fileName?: any;
  fileType?: any;
}

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css'],
})
export class FormCreateComponent implements OnInit {
  controls: any;
  formFields: any[] = [];
  isUpdateModeOn = false;
  isUpdateModeId: any;
  formValues: any;

  constructor(
    private formService: FormServiceService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private routes: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  fetchControlFromDb() {
    this.formService.getControlsFromDb().subscribe((response: any) => {
      this.controls = response;
    });
  }

  setDataIfEditModeIsOn() {
    this.routes.queryParams.subscribe((paramas: any) => {
      this.isUpdateModeOn = false;
      this.isUpdateModeId = null;
      if (paramas && paramas.id) {
        this.formService
          .getFormWithId(paramas.id)
          .subscribe((response: any) => {
            this.isUpdateModeOn = true;
            this.isUpdateModeId = response.id;
            this.formFields = response.controls;
            this.formValues = {
              fileName: response.fileName,
              fileType: response.fileType,
            };
          });
      }
    });
  }

  ngOnInit() {
    this.fetchControlFromDb();
    this.setDataIfEditModeIsOn();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  openDialog(data: any): void {
    let dialogRef: any;
    if (data.type === 'delete') {
      dialogRef = this.dialog.open(FormDeleteComponent, {
        data: { controls: this.formFields, id: data.id },
      });
    } else if (data.type === 'update') {
      dialogRef = this.dialog.open(FormUpdateComponent, {
        data: { controls: this.formFields, item: data.item },
      });
    }

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (result.data.modalType === 'delete') {
          this.formFields = result.data.controls;
        } else if (result.modalType === 'update') {
          this.formFields = result.data;
          this.openSnackBar('Field updated successfully!', 'ok');
        }
      }
    });
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      event.previousContainer.data[event.previousIndex] = {
        ...event.previousContainer.data[event.previousIndex],
        id: new Date().getTime(),
      };
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  handleDelete(id: number) {
    const data = { id, type: 'delete' };
    this.openDialog(data);
  }

  handleUpdateField(item: any) {
    const data = { item, type: 'update' };
    this.openDialog(data);
  }

  clearFieldAndSetSnackMsg(msg: any) {
    this.formFields = [];
    this.router.navigate(['forms']);
    this.openSnackBar(msg, 'Ok');
  }

  handleSaveForm() {
    let data: data = {
      controls: this.formFields,
      isUpdateModeOn: this.isUpdateModeOn,
      id: this.isUpdateModeId,
    };
    if (this.formValues) {
      data = {
        ...data,
        fileName: this.formValues.fileName,
        fileType: this.formValues.fileType,
      };
    }
    const dialogRef = this.dialog.open(FormsSaveComponent, { data });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.modalType === 'create') {
        this.clearFieldAndSetSnackMsg('Created successfully');
      } else if (result.modalType === 'update') {
        this.clearFieldAndSetSnackMsg('Updated successfully');
      }
    });
  }
  handlePreview() {
    const dialogRef = this.dialog.open(FormPreviewComponent, {
      data: { controls: this.formFields },
    });
    dialogRef.afterClosed().subscribe(() => {});
  }
}
