import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

const Components = [NavbarComponent, FooterComponent];

@NgModule({
  declarations: [Components],
  imports: [CommonModule, RouterModule],
  exports: [Components],
})
export class CoreModule {}
