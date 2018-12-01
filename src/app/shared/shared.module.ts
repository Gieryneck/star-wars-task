import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableNavComponent } from './components/table-nav/table-nav.component';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [TableNavComponent, FilterComponent],
  imports: [
    CommonModule,
  ],
  exports: [TableNavComponent, FilterComponent]
})
export class SharedModule { }
