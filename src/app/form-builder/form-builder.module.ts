import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCreateComponent } from './form-create/form-create.component';
import { FormUpdateComponent } from './form-update/form-update.component';
import { FormDeleteComponent } from './form-delete/form-delete.component';
import { FormPreviewComponent } from './form-preview/form-preview.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsTableComponent } from './forms-table/forms-table.component';
import { FormsSaveComponent } from './forms-save/forms-save.component';

const Components = [
  FormCreateComponent,
  FormUpdateComponent,
  FormDeleteComponent,
  FormPreviewComponent,
];

@NgModule({
  declarations: [Components, FormsTableComponent, FormsSaveComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [Components],
})
export class FormBuilderModule {}
