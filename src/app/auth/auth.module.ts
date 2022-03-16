import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const Components = [LoginComponent, RegisterComponent];

@NgModule({
  declarations: [Components],
  imports: [CommonModule],
  exports: [Components],
})
export class AuthModule {}
