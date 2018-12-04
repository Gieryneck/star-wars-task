import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableNavComponent } from './components/table-nav/table-nav.component';
import { FilterComponent } from './components/filter/filter.component';
import { FocusFirstInvalidFieldDirective } from './directives/focus-first-invalid-field.directive';

@NgModule({
  declarations: [TableNavComponent, FilterComponent, FocusFirstInvalidFieldDirective],
  imports: [
    CommonModule,
  ],
  exports: [TableNavComponent, FilterComponent, FocusFirstInvalidFieldDirective]
})
export class SharedModule { }
