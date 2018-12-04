import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpeciesResolverService } from './characters/species-resolver.service';

import { ListViewComponent } from './characters/list-view/list-view.component';
import { CharacterFormComponent } from './characters/character-form/character-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listview',
    pathMatch: 'full'
  },
  {
    path: 'listview',
    component: ListViewComponent
  },
  {
    path: 'addcharacter',
    component: CharacterFormComponent,
    resolve: {
      species: SpeciesResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
