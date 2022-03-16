import { NgModule } from '@angular/core';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const Components = [
  DragDropModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatDialogModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatTableModule,
  MatSnackBarModule,
];

@NgModule({
  imports: [Components],
  exports: [Components],
})
export class MaterialModule {}
