import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from './components/badge/badge.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    BadgeComponent,
    TableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BadgeComponent,
    TableComponent
  ]
})
export class SharedModule { }
