import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from './components/badge/badge.component';
import { TableComponent } from './components/table/table.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ButtonComponent } from './components/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputDirective } from './directives/input.directive';

@NgModule({
  declarations: [
    BadgeComponent,
    TableComponent,
    SpinnerComponent,
    ButtonComponent,
    InputDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    BadgeComponent,
    TableComponent,
    SpinnerComponent,
    ButtonComponent,
    InputDirective
  ]
})
export class SharedModule { }
