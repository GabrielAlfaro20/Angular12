import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './_layout/layout.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PagesRoutingModule } from './pages-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    MatDialogModule,
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    MatToolbarModule
  ]
})
export class LayoutModule { }
