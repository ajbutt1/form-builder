import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';

const Components = [LoginComponent, RegisterComponent];

@NgModule({
  declarations: [Components],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [Components],
})
export class AuthModule {}
