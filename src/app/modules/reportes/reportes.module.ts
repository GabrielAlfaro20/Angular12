import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportesComponent } from './reportes.component';

const routes: Routes = [
  {
    path: '',component:ReportesComponent,
  }
]
@NgModule({
  declarations: [ReportesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
  exports: [RouterModule],

})
export class ReportesModule { }
