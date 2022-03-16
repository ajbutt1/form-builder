import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormDeleteComponent } from '../form-delete/form-delete.component';

import { FormPreviewComponent } from '../form-preview/form-preview.component';
import { FormServiceService } from '../form-service.service';

@Component({
  selector: 'app-forms-table',
  templateUrl: './forms-table.component.html',
  styleUrls: ['./forms-table.component.css'],
})
export class FormsTableComponent implements OnInit {
  displayedColumns: string[] = ['fileName', 'formType', 'actions'];
  dataSource: any;

  constructor(
    private formService: FormServiceService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  fetchDataFromServer() {
    this.formService.getAllForms().subscribe((response) => {
      this.dataSource = response;
    });
  }

  ngOnInit() {
    this.fetchDataFromServer();
  }

  handleFormRowUpdate(data: any) {
    this.router.navigate(['admin'], { queryParams: { id: data.id } });
  }

  deleteRowFromTable(id: any) {
    const dialogRef = this.dialog.open(FormDeleteComponent, {
      data: { id, deleteFrom: 'table' },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.fetchDataFromServer();
    });
  }

  handlePreviewInTable(data: any) {
    let dialogRef = this.dialog.open(FormPreviewComponent, {
      data: { controls: data },
    });
    dialogRef.afterClosed().subscribe(() => {});
  }
}
