import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListViewComponent } from './list-view/list-view.component';
import { CharactersTableComponent } from './characters-table/characters-table.component';

@NgModule({
  declarations: [ListViewComponent, CharactersTableComponent],
  imports: [
    CommonModule
  ]
})

export class CharactersModule {}

