import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRouterModule } from '../../routing/layout-router.module';
import { MaterialModule } from '../../../material/material.module';
import { LayoutComponent } from '../../../layout/layout.component';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRouterModule,
    MaterialModule
  ]
})
export class LayoutModule { }
