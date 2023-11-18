import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordarpassPage } from './recordarpass.page';

const routes: Routes = [
  {
    path: '',
    component: RecordarpassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordarpassPageRoutingModule {}
