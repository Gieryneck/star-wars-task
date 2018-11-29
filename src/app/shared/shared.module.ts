import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableNavComponent } from './components/table-nav/table-nav.component';

@NgModule({
  declarations: [TableNavComponent],
  imports: [
    CommonModule,
  ],
  exports: [TableNavComponent]
})
export class SharedModule { }
