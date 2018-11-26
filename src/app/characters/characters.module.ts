import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListItemComponent } from './list-item/list-item.component';
import { ListViewComponent } from './list-view/list-view.component';

@NgModule({
  declarations: [ListViewComponent, ListItemComponent],
  imports: [
    CommonModule
  ]
})

export class CharactersModule {}

