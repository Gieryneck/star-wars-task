import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { ListViewComponent } from './list-view/list-view.component';
import { CharactersTableComponent } from './characters-table/characters-table.component';
import { CharacterFormComponent } from './character-form/character-form.component';

@NgModule({
  declarations: [ListViewComponent, CharactersTableComponent, CharacterFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class CharactersModule {}

