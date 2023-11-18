import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeccionalumnoPage } from './seccionalumno.page';

const routes: Routes = [
  {
    path: '',
    component: SeccionalumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeccionalumnoPageRoutingModule {}
