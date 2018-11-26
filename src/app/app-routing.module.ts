import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListViewComponent } from './characters/list-view/list-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listview',
    pathMatch: 'full'
  },
  {
    path: 'listview',
    component: ListViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
